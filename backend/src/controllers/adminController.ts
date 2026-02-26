import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Get all users (admin only)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        _count: {
          select: { menus: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(users);
  } catch (error: any) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get single user (admin only)
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        menus: {
          include: {
            _count: {
              select: { items: true }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Create user (admin only)
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password, role } = req.body;

    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Email or username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role: role || 'USER'
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true
      }
    });

    res.status(201).json(user);
  } catch (error: any) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update user (admin only)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, username, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if email/username already taken by another user
    if (email || username) {
      const duplicate = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                ...(email ? [{ email }] : []),
                ...(username ? [{ username }] : [])
              ]
            }
          ]
        }
      });

      if (duplicate) {
        return res.status(409).json({ error: 'Email or username already exists' });
      }
    }

    const updateData: any = {};
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (role) updateData.role = role;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true
      }
    });

    res.json(user);
  } catch (error: any) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete user (admin only)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUserId = (req as any).user.id;

    // Prevent self-deletion
    if (id === currentUserId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.user.delete({
      where: { id }
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Get admin statistics
export const getStats = async (req: Request, res: Response) => {
  try {
    const [totalUsers, totalMenus, totalMenuItems] = await Promise.all([
      prisma.user.count(),
      prisma.menu.count(),
      prisma.menuItem.count()
    ]);

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });

    res.json({
      totalUsers,
      totalMenus,
      totalMenuItems,
      recentUsers,
      activeSessions: 0 // Could be implemented with session tracking
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};
