import { Auction, AuctionImage } from '../models/auction.js';
import multer from 'multer'
import path from 'path'

export const handleImageUpload = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage }).array('images', 6);

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Failed to upload image' });
        }
        // console.log('request.body!!!:',req)
        // Call next() only if there is no error
        next();
    });
};

export const createAuction = async (req, res) => {
    try {
        const { itemDescription, bid, userId, condition, quantity, dispatch, brand, color, size, bidLength, sellersDescription, returns } = req.body;
        const images = req.files || [];

        const auction = await Auction.create({
            itemDescription,
            bid,
            userId,
            condition,
            quantity,
            dispatch,
            brand,
            color,
            size,
            bidLength,
            sellersDescription,
            returns
        });

        const auctionImages = await Promise.all(images.map(async (imageData) => {
            const auctionImage = await AuctionImage.create({
                auctionId: auction.id,
                name: imageData.originalname, // Use originalname property for the file name
                path: imageData.path
            });
            return auctionImage;
        }));

        // Send response only after all auction images have been created
        res.status(201).json({ message: 'Auction created successfully!' });
    } catch (error) {
        console.error('Error creating auction:', error.message);
        res.status(400).json({ message: error.message });
    }
};

export const getAllAuctions = async (req, res) => {
    try {
        const auctions = await Auction.findAll({
            include: AuctionImage
        })
        res.status(200).json({auctions})
    } catch (error) {
        console.error('Error fetching auctions:', error.message)
        res.status(500).json({message: error})
    }
}

export const getAuctionById = async (req, res) => {
    try {
        const { id } = req.params
        const auction = await Auction.findOne({
            where: { id },
            include: AuctionImage
        })

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found'})
        }

        res.status(200).json({ auction })
    } catch (error) {
        console.error('Error fetching auction by ID:', error.message)
        res.status(500).json({ message: 'Internal server error'})
    }
}
