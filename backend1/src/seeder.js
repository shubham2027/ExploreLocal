import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Experience from './models/Experience.js';
import User from './models/User.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Find a host user
        let hostUser = await User.findOne({ role: 'host' });
        if (!hostUser) {
            hostUser = await User.findOne({ role: 'admin' });
        }
        if (!hostUser) {
            hostUser = await User.findOne({});
        }

        if (!hostUser) {
            console.error('Error: No users found. Please register a user first.');
            process.exit(1);
        }

        const hostId = hostUser._id;

        // Clean existing data
        console.log('Clearing existing experiences...');
        await Experience.deleteMany({});

        const categories = {
            'Food': [
                {
                    title: 'Street Food Walking Tour',
                    description: 'Explore the hidden gems of local street food. Taste the best authentic dishes in the heart of the city.',
                    price: 45,
                    location: 'Downtown Market',
                    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Grandma\'s Secret Recipes',
                    description: 'Learn to cook traditional meals with authentic family recipes passed down through generations.',
                    price: 80,
                    location: 'Old Town Heritage House',
                    image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Vineyard Sunset Tasting',
                    description: 'A relaxing afternoon tasting the finest wines of the region while watching the sunset.',
                    price: 120,
                    location: 'Rolling Hills Vineyard',
                    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Craft Beer Brewery Tour',
                    description: 'Go behind the scenes of the most popular local breweries and taste exclusive batches.',
                    price: 50,
                    location: 'Industrial District',
                    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Gourmet Rooftop Dining',
                    description: 'Enjoy a 5-course chef\'s tasting menu with a breathtaking view of the city skyline.',
                    price: 150,
                    location: 'Sky Tower',
                    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                }
            ],
            'Culture': [
                {
                    title: 'Ancient City Architecture Walk',
                    description: 'Walk through centuries of history with an expert architect guide revealing hidden details.',
                    price: 30,
                    location: 'City Center',
                    image: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Traditional Dance Performance',
                    description: 'Experience the rhythm and color of our local dance culture in an intimate setting.',
                    price: 60,
                    location: 'Arts Theater',
                    image: 'https://images.unsplash.com/photo-1508215885820-4585e56135c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Night at the Museum',
                    description: 'An exclusive private tour of the national museum after hours without the crowds.',
                    price: 75,
                    location: 'National Museum',
                    image: 'https://images.unsplash.com/photo-1518998053901-5348d3969105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Pottery Making Masterclass',
                    description: 'Get your hands dirty and make your own clay pot to take home.',
                    price: 55,
                    location: 'Artisans Village',
                    image: 'https://images.unsplash.com/photo-1565193566173-7a646c9f8766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Summer Music Festival VIP',
                    description: 'VIP access to the biggest local music event of the year with backstage passes.',
                    price: 200,
                    location: 'Grand Park',
                    image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                }
            ],
            'Nature': [
                {
                    title: 'Mountain Peak Expedition',
                    description: 'A challenging but rewarding hike to the highest peak for panoramic views.',
                    price: 40,
                    location: 'Blue Mountains',
                    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Forest Mindfulness Retreat',
                    description: 'Reconnect with nature in this guided meditation session deep in the ancient woods.',
                    price: 65,
                    location: 'Whispering Woods',
                    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Hidden Waterfall Discovery',
                    description: 'Trek through the jungle to discover a secluded waterfall perfect for swimming.',
                    price: 55,
                    location: 'Rainforest Reserve',
                    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Sunrise Lake Kayaking',
                    description: 'Paddle through calm, misty waters as the sun rises over the lake.',
                    price: 70,
                    location: 'Crystal Lake',
                    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Wildlife Photography Safari',
                    description: 'Learn to capture the perfect shot of local fauna with a professional photographer.',
                    price: 90,
                    location: 'Safari Park',
                    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                }
            ],
            'Workshop': [
                {
                    title: 'Oil Painting for Beginners',
                    description: 'Unlock your inner artist with this step-by-step painting workshop.',
                    price: 60,
                    location: 'Creative Studio',
                    image: 'https://images.unsplash.com/photo-1460661631046-5b82f7f6d2f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Barista Coffee Brewing',
                    description: 'Become a barista for a day and learn to brew the perfect cup of specialty coffee.',
                    price: 45,
                    location: 'Main St Roastery',
                    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Handmade Jewelry Workshop',
                    description: 'Design and create your own unique silver jewelry piece to wear.',
                    price: 85,
                    location: 'Gemstone Lab',
                    image: 'https://images.unsplash.com/photo-1617038224538-276365d6361a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Custom Perfume Creation',
                    description: 'Mix organic scents to create your personal signature fragrance.',
                    price: 100,
                    location: 'Scent Bar',
                    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Woodworking Fundamentals',
                    description: 'Learn the safety and basics of woodworking and make a cutting board.',
                    price: 75,
                    location: 'The Woodshop',
                    image: 'https://images.unsplash.com/photo-1611691362837-7f9cb737d25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                }
            ],
            'Adventure': [
                {
                    title: 'Canopy Zip-lining Tour',
                    description: 'Fly through the treetops on high-speed zip lines.',
                    price: 95,
                    location: 'Adventure Park',
                    image: 'https://images.unsplash.com/photo-1533561797500-4fad14e9c421?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Rock Climbing 101',
                    description: 'Learn to climb safely on natural rock faces with certified instructors.',
                    price: 70,
                    location: 'Granite Cliffs',
                    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'White Water Rafting',
                    description: 'Adrenaline pumping journey down the Class III rapids.',
                    price: 110,
                    location: 'Rapid River',
                    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab9f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'ATV Jungle Mud Run',
                    description: 'Ride powerful ATVs through muddy tracks and dense jungle trails.',
                    price: 85,
                    location: 'Off-road Zone',
                    image: 'https://images.unsplash.com/photo-1568478496464-9642597f80f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    title: 'Tandem Paragliding',
                    description: 'Soar like a bird and see the world from above with an expert pilot.',
                    price: 180,
                    location: 'Sky High Point',
                    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                }
            ]
        };

        let count = 0;
        for (const [category, experiences] of Object.entries(categories)) {
            for (const exp of experiences) {
                await Experience.create({
                    ...exp,
                    category: category,
                    host: hostId
                });
                count++;
            }
        }

        console.log(`Successfully added ${count} new, unique experiences!`);
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
