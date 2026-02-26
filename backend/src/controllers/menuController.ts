import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all menus for authenticated user
export const getMenus = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const menus = await prisma.menu.findMany({
      where: { userId },
      include: {
        items: true,
        _count: {
          select: { items: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(menus);
  } catch (error: any) {
    console.error('Get menus error:', error);
    res.status(500).json({ error: 'Failed to fetch menus' });
  }
};

// Get single menu by ID
export const getMenuById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const menu = await prisma.menu.findFirst({
      where: { 
        id,
        userId 
      },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.json(menu);
  } catch (error: any) {
    console.error('Get menu error:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
};

// Create new menu
export const createMenu = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Menu title is required' });
    }

    const menu = await prisma.menu.create({
      data: {
        title,
        userId
      },
      include: {
        items: true
      }
    });

    res.status(201).json(menu);
  } catch (error: any) {
    console.error('Create menu error:', error);
    res.status(500).json({ error: 'Failed to create menu' });
  }
};

// Update menu
export const updateMenu = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const { title } = req.body;

    // Check ownership
    const existingMenu = await prisma.menu.findFirst({
      where: { id, userId }
    });

    if (!existingMenu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    const menu = await prisma.menu.update({
      where: { id },
      data: { title },
      include: {
        items: true
      }
    });

    res.json(menu);
  } catch (error: any) {
    console.error('Update menu error:', error);
    res.status(500).json({ error: 'Failed to update menu' });
  }
};

// Delete menu
export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    // Check ownership
    const existingMenu = await prisma.menu.findFirst({
      where: { id, userId }
    });

    if (!existingMenu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    await prisma.menu.delete({
      where: { id }
    });

    res.json({ message: 'Menu deleted successfully' });
  } catch (error: any) {
    console.error('Delete menu error:', error);
    res.status(500).json({ error: 'Failed to delete menu' });
  }
};

// Get all menu items for a menu
export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { menuId } = req.params;

    // Check menu ownership
    const menu = await prisma.menu.findFirst({
      where: { id: menuId, userId }
    });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    const menuItems = await prisma.menuItem.findMany({
      where: { menuId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(menuItems);
  } catch (error: any) {
    console.error('Get menu items error:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

// Add menu item
export const addMenuItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { menuId, name, description, cuisineType, itemType, imageUrl, restaurantUrl, rating } = req.body;

    // Validate required fields
    if (!menuId || !name || !itemType) {
      return res.status(400).json({ error: 'Menu ID, name, and item type are required' });
    }

    // Check menu ownership
    const menu = await prisma.menu.findFirst({
      where: { id: menuId, userId }
    });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        menuId,
        name,
        description: description || '',
        cuisineType: cuisineType || 'Other',
        itemType,
        imageUrl: imageUrl || '',
        restaurantUrl: restaurantUrl || '',
        rating: rating || 0
      }
    });

    res.status(201).json(menuItem);
  } catch (error: any) {
    console.error('Add menu item error:', error);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
};

// Update menu item
export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const { name, description, cuisineType, itemType, imageUrl, restaurantUrl, rating } = req.body;

    // Check ownership through menu
    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
      include: { menu: true }
    });

    if (!existingItem || existingItem.menu.userId !== userId) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    const menuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name,
        description,
        cuisineType,
        itemType,
        imageUrl,
        restaurantUrl,
        rating
      }
    });

    res.json(menuItem);
  } catch (error: any) {
    console.error('Update menu item error:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
};

// Delete menu item
export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    // Check ownership through menu
    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
      include: { menu: true }
    });

    if (!existingItem || existingItem.menu.userId !== userId) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    await prisma.menuItem.delete({
      where: { id }
    });

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error: any) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
};

// Get random menu selection
export const getRandomMenu = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { menuId } = req.params;

    // Check menu ownership
    const menu = await prisma.menu.findFirst({
      where: { id: menuId, userId }
    });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    const menuItems = await prisma.menuItem.findMany({
      where: { menuId }
    });

    if (menuItems.length === 0) {
      return res.status(404).json({ error: 'No items in menu' });
    }

    // Get random items (1 food and 1 drink if available)
    const foods = menuItems.filter(item => item.itemType === 'FOOD');
    const drinks = menuItems.filter(item => item.itemType === 'DRINK');

    const randomFood = foods.length > 0 ? foods[Math.floor(Math.random() * foods.length)] : null;
    const randomDrink = drinks.length > 0 ? drinks[Math.floor(Math.random() * drinks.length)] : null;

    res.json({
      food: randomFood,
      drink: randomDrink,
      message: randomFood || randomDrink ? 'Random menu generated!' : 'No items available'
    });
  } catch (error: any) {
    console.error('Random menu error:', error);
    res.status(500).json({ error: 'Failed to generate random menu' });
  }
};

// Get random item from all items globally
export const getRandomGlobalItem = async (req: Request, res: Response) => {
  try {
    // Get all items from database
    const allItems = await prisma.menuItem.findMany();

    if (allItems.length === 0) {
      return res.status(404).json({ error: 'No items available' });
    }

    // Get random item
    const randomItem = allItems[Math.floor(Math.random() * allItems.length)];

    res.json(randomItem);
  } catch (error: any) {
    console.error('Random global item error:', error);
    res.status(500).json({ error: 'Failed to get random item' });
  }
};

// Get all menu items (global)
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json(items);
  } catch (error: any) {
    console.error('Get all items error:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};
