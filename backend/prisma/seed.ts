import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data (in development only)
    console.log('Clearing existing data...');
    try {
      await prisma.menuItem.deleteMany({});
      await prisma.menu.deleteMany({});
      await prisma.user.deleteMany({});
      console.log('✅ Existing data cleared');
    } catch (e) {
      console.log('ℹ️ No existing data to clear or error during cleanup');
    }

    // Create admin user
    console.log('Creating admin user...');
    const adminPassword = await hashPassword('adminpass');
    const adminUser = await prisma.user.create({
      data: {
        email: 'adminuser@local.com',
        username: 'adminuser',
        password: adminPassword,
        role: 'ADMIN',
      },
    });
    console.log(`✅ Admin user created: ${adminUser.username}`);

    // Create regular user
    console.log('Creating test user...');
    const testUserPassword = await hashPassword('testuser');
    const testUser = await prisma.user.create({
      data: {
        email: 'testuser@local.com',
        username: 'testuser',
        password: testUserPassword,
        role: 'USER',
      },
    });
    console.log(`✅ Test user created: ${testUser.username}`);

    // Create sample menu for test user
    console.log('Creating sample menu...');
    const sampleMenu = await prisma.menu.create({
      data: {
        title: 'Korean Favorites',
        userId: testUser.id,
      },
    });
    console.log(`✅ Sample menu created: ${sampleMenu.title}`);

    // Create Korean food/drink menu items
    const menuItems = [
      {
        name: 'Bibimbap (비빔밥)',
        description: 'Mixed rice with vegetables and meat, topped with fried egg and gochujang sauce',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1564701158241-0a77d7ac14d7?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/bibimbap+restaurants',
        rating: 5,
      },
      {
        name: 'Bulgogi (불고기)',
        description: 'Marinated grilled beef with sweet and savory flavors',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561e1d?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/bulgogi+restaurants',
        rating: 5,
      },
      {
        name: 'Kimchi Jjigae (김치찌개)',
        description: 'Spicy kimchi stew with pork, tofu, and vegetables',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/kimchi+jjigae+restaurants',
        rating: 4,
      },
      {
        name: 'Tteokbokki (떡볶이)',
        description: 'Spicy stir-fried rice cakes with fish cake, gochujang, and vegetables',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b5?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/tteokbokki+restaurants',
        rating: 4,
      },
      {
        name: 'Japchae (잡채)',
        description: 'Stir-fried sweet potato glass noodles with vegetables and meat',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1585966975160-b3305d2804b1?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/japchae+restaurants',
        rating: 4,
      },
      {
        name: 'Samgyeopsal (삼겹살)',
        description: 'Grilled pork belly, typically served with lettuce and ssamjang',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cda1ec?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/samgyeopsal+restaurants',
        rating: 5,
      },
      {
        name: 'Dakgangjeong (닭강정)',
        description: 'Crispy fried chicken glazed with sweet and spicy sauce',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cda1ec?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/dakgangjeong+restaurants',
        rating: 5,
      },
      {
        name: 'Hodugomul (호두과자)',
        description: 'Sweet red bean pastry shaped like a walnut',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/hodugomul+dessert',
        rating: 3,
      },
      {
        name: 'Sikhye (식혜)',
        description: 'Sweet rice drink made from malt, traditionally served after meals',
        cuisineType: 'Korean',
        itemType: 'DRINK',
        imageUrl: 'https://images.unsplash.com/photo-1591080876284-3a71eec54f1a?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/korean+restaurant',
        rating: 4,
      },
      {
        name: 'Yujacha (유자차)',
        description: 'Warm citrus tea made from yuzu fruit, honey, and water',
        cuisineType: 'Korean',
        itemType: 'DRINK',
        imageUrl: 'https://images.unsplash.com/photo-1597318970505-d18e58caeadb?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/korean+cafe',
        rating: 4,
      },
      {
        name: 'Korean Iced Coffee (아이스 커피)',
        description: 'Cold brew coffee popular in Korean cafes, smooth and rich',
        cuisineType: 'Korean',
        itemType: 'DRINK',
        imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/korean+cafe',
        rating: 5,
      },
      {
        name: 'Omija Tea (오미자차)',
        description: 'Five-flavor berry tea with sweet and tart taste',
        cuisineType: 'Korean',
        itemType: 'DRINK',
        imageUrl: 'https://images.unsplash.com/photo-1597318970505-d18e58caeadb?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/korean+tea+house',
        rating: 4,
      },
      {
        name: 'Galbi (갈비)',
        description: 'Grilled short ribs marinated in soy sauce, garlic, and pear',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561e1d?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/galbi+restaurants',
        rating: 5,
      },
      {
        name: 'Sundubu Jjigae (순두부찌개)',
        description: 'Soft tofu stew with clams or seafood in spicy broth',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/sundubu+jjigae',
        rating: 4,
      },
      {
        name: 'Gimbap (김밥)',
        description: 'Seaweed rice roll with vegetables, egg, and meat',
        cuisineType: 'Korean',
        itemType: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop',
        restaurantUrl: 'https://www.google.com/maps/search/gimbap+restaurants',
        rating: 4,
      },
    ];

    // Create menu items
    for (const item of menuItems) {
      await prisma.menuItem.create({
        data: {
          name: item.name,
          description: item.description,
          cuisineType: item.cuisineType,
          itemType: item.itemType as any,
          imageUrl: item.imageUrl,
          restaurantUrl: item.restaurantUrl,
          rating: item.rating,
          menuId: sampleMenu.id,
        },
      });
    }

    console.log(`✅ ${menuItems.length} menu items created`);

    // Create admin menu
    const adminMenu = await prisma.menu.create({
      data: {
        title: 'Admin Menu Library',
        userId: adminUser.id,
      },
    });

    // Add some items to admin menu as well
    for (const item of menuItems.slice(0, 5)) {
      await prisma.menuItem.create({
        data: {
          name: item.name,
          description: item.description,
          cuisineType: item.cuisineType,
          itemType: item.itemType as any,
          imageUrl: item.imageUrl,
          restaurantUrl: item.restaurantUrl,
          rating: item.rating,
          menuId: adminMenu.id,
        },
      });
    }

    console.log(`✅ Admin menu created with sample items`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('─────────────────');
    console.log('Admin Account:');
    console.log('  Email: adminuser@local.com');
    console.log('  Password: adminpass');
    console.log('  Role: ADMIN');
    console.log('\nTest User Account:');
    console.log('  Email: testuser@local.com');
    console.log('  Password: testuser');
    console.log('  Role: USER');
  } catch (error) {
    console.error('❌ Seed error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('Fatal seed error:', e);
    process.exit(1);
  });
