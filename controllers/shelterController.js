import Shelter from './../models/Shelter.js';
export const createShelter = async (req, res) => {

    try {
        const existingShelter = await Shelter.findOne({ name: req.body.name });
        if (existingShelter) {
            return res.status(400).json({ message: 'A shelter with the same name already exists' });
        }

        const newShelter = new Shelter(req.body);
        await newShelter.save();
        res.status(201).json(newShelter);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create shelter', error: error.message });
    }
};
