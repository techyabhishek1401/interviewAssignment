"use strict";
const con = require("../database-connection/connection");

module.exports = {


    login: (req, res) => {

        // Find user by email
        let findby = email_or_mobile(req.body.unique_id);
        con.getDb().collection("userProfile")
            .findOne(findby)
            .then(user => {
                // Check if user exists
                if (!user) {
                    return res.json({ status: "User not found" });
                    // .......return res.json({ emailnotfound: "Email not found" });
                }

                const payload = { user: user.first_name, id: user._id };
                const options = { expiresIn: '1d', issuer: 'https://prydehealth.com' };
                const secret = process.env.JWT_SECRET;
                const refreshSecret = process.env.JWT_REFRESH_SECRET;
                const token = jwt.sign(payload, secret, options);

                //const secret = 'EDYRPNEKOT';
                console.log("secret:", secret)
                // const refreshSecret = process.env.JWT_REFRESH_SECRET;
                // const token = jwt.sign(payload, secret, options);
                // const refreshToken = jwt.sign(payload, refreshSecret, options);
                const filename = user.imageArray ? user.imageArray[user.imageArray.length - 1] : "https://image-bucket-pro.s3.ap-south-1.amazonaws.com/doc-image/docProfile5.jpg";

                if (HashPassword.decrypt(user.password) === req.body.password) {
                    /** If Password is correct then check if user is active or not
                     * if user is active then send success login response
                     */

                    if (user.active) {

                        //let encoded = HashPassword.encrypt(JSON.stringify(
                        let encoded =
                        {
                            user: user.first_name,
                            id: user._id,
                            first_name: user.first_name,
                            mobile: findby.mobile,
                            email: findby.email || "default",
                            role: "doctor",
                            speciality: user.speciality,
                            education: user.education,
                            address: user.address,
                            discountedFee: user.discountedFee,
                            fee: user.fee,
                            available: user.available,
                            start: user.start,
                            end: user.end,
                            gender: user.gender,
                            experience: user.experience,
                            department: user.department,
                            filename: filename,
                            attendant: user.attendant,
                            mci: user.mci,
                            hospitals: user.hospitals,
                            certification: user.certification,
                            about: user.about,
                            slots: user.slots,
                            mrn: user.mrn,
                            logo: user.logo,
                            experiences: user.experiences,
                            feedback: user.feedback,
                            services: user.services,
                            hospitals: user.hospitals
                        }

                        var aesUtil = new AesUtil(128, 1000);
                        encoded = aesUtil.encrypt(JSON.stringify(encoded));
                        const refreshToken = jwt.sign(payload, refreshSecret, options);


                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            encoded,
                            new_csrf_token: refreshToken,
                        });
                    }
                    //if password is correct but user is not active
                    else {
                        return res.json({
                            verify_email: "You Need To Verify Your Email First"
                        });
                    }
                } else {
                    /**
                     * If user is Valid but password is incorrect
                     */
                    return res.json({ status: "Password incorrect" });
                }
            }).catch(err => {
                console.log("error:", err);
                res.send({ status: "error occured", err })
            });

    },

}
