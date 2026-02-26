import { Router } from 'express';
import {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getRandomMenu,
  getRandomGlobalItem,
  getAllItems
} from '../controllers/menuController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes (no authentication required)
router.get('/public/random', getRandomGlobalItem);
router.get('/public/all', getAllItems);

// All other routes require authentication
router.use(authenticateToken);

// Menu routes
router.get('/', getMenus);
router.get('/:id', getMenuById);
router.post('/', createMenu);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);

// Menu item routes
router.get('/:menuId/items', getMenuItems);
router.post('/items', addMenuItem);
router.put('/items/:id', updateMenuItem);
router.delete('/items/:id', deleteMenuItem);

// Random menu
router.get('/:menuId/random', getRandomMenu);

export default router;
