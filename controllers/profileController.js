import { Profile } from "../models/Profile.js";

// export const createProfile = async (req, res) => {
//     try {
//         const { firstName, lastName, email, contact, addressLine1, apartment, province, country, postalCode, profileImage } = req.body;
//         const userId = req.user.userId; // Assuming the user ID comes from the JWT token

//         const existingProfile = await Profile.findOne({ userId });
//         if (existingProfile) {
//             return res.status(400).json({ message: "Profile already exists" });
//         }

//         const profile = new Profile({
//             userId,
//             firstName,
//             lastName,
//             email,
//             contact,
//             addressLine1,
//             apartment,
//             province,
//             country,
//             postalCode,
//             profileImage,
//         });

//         await profile.save();

//         res.status(201).json({ message: "Profile created successfully", profile });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

export const createProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, contact, addressLine1, apartment, province, country, postalCode, profileImage } = req.body;
        const userId = req.user.userId; // Assuming the user ID comes from the JWT token

        const existingProfile = await Profile.findOne({ userId });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists" });
        }

        const profile = new Profile({
            userId, // Saving userId
            firstName,
            lastName,
            email,
            contact,
            addressLine1,
            apartment,
            province,
            country,
            postalCode,
            profileImage,
        });

        await profile.save();

        // Returning both profileId and userId in the response
        res.status(201).json({ message: "Profile created successfully", profileId: profile._id, userId: profile.userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getProfile = async (req, res) => {
    try {
      const { email } = req.query; // Extract email from query params
  
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const profile = await Profile.findOne({ email });
  
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  


// export const getProfile = async (req, res) => {
//     try {
//         const profile = await Profile.findOne({ userId: req.user.userId });
//         if (!profile) {
//             return res.status(404).json({ message: "Profile not found" });
//         }

//         res.json({ profile });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, contact, addressLine1, apartment, province, country, postalCode, profileImage } = req.body;

        const profile = await Profile.findOne({ userId: req.user.userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        profile.firstName = firstName || profile.firstName;
        profile.lastName = lastName || profile.lastName;
        profile.email = email || profile.email;
        profile.contact = contact || profile.contact;
        profile.addressLine1 = addressLine1 || profile.addressLine1;
        profile.apartment = apartment || profile.apartment;
        profile.province = province || profile.province;
        profile.country = country || profile.country;
        profile.postalCode = postalCode || profile.postalCode;
        profile.profileImage = profileImage || profile.profileImage;

        await profile.save();

        res.json({ message: "Profile updated successfully", profile });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
