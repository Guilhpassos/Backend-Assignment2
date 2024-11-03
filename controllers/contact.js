let contacts = require('../models/contacts');

module.exports.create = async function (req, res, next) {
    try {
        let newContact = new contacts(req.body);

        let result = await contacts.create(newContact);
        res.json(
            {
                success: true,
                message: 'Contact created successfully.'
            }
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.list = async function (req, res, next) {
    try {
        let list = await contacts.find({}, '-password');

        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.contactGet = async function (req, res, next) {
    try {
        let cID = req.params.contactID;

        req.contact = await contacts.findOne({ _id: cID }, '-password');
        next();

    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports.contactsByID = async function (req, res, next) {
    res.json(req.contact);
}

module.exports.update = async function (req, res, next) {
    try {
        let cID = req.params.contactID;

        let updateContact = new contacts(req.body);
        updateContact._id = cID;

        let result = await contacts.updateOne({ _id: cID }, updateContact);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'Contact updated successfully.'
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('Contact not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.remove = async function (req, res, next) {
    try {
        let cID = req.params.contactID;

        let result = await contacts.deleteOne({ _id: cID });
        console.log(result);

        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'Contact deleted successfully.'
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('Contact not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}