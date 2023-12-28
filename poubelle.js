/* const confirmPasswordChild = (async (req, res) => {
    try {
        await Child.findOne({ childNumber: req.params.childNumber }).then(
            child => {
                console.log(child)
                if (child == null) {
                    res.status(500).json({ message: 'mot de passe incorrect' })
                } else {
                    bcrypt.compare(req.body.codeSecurite, child.codeSecurite)
                        .then(valid => {
                            console.log('valid');
                            if (valid == false) {
                                res.status(400).json({
                                    status: "400",
                                    message: 'mot de passe incorrect'
                                })
                            } else {
                                return res.status(201).json({
                                    status: "201",
                                    childNumber: req.params.childNumber,
                                    childId: child._id,
                                    message: 'password confirmed'
                                })
                            }
                        })
                        .catch(error => res.json({ error }))
                }
            })
    } catch (error) {
        console.log(error);
    }
})

const addPasswordChild = (async (req, res) => {
    try {
        bcrypt.hash(req.body.codeSecurite, 10)
            .then(async hash => {
                const child = await Child.findOneAndUpdate(
                    { childNumber: req.params.childNumber },
                    { codeSecurite: hash },
                    { $currentDate: { lastModified: true } }
                );
                await child.save()
                    .then(() => res.status(201).json({ message: 'utilisateur enregistré !' }))
                    .catch(error => res.status(400).json({ error }));
                console.log(child);
            })
            .catch(error => res.status(500).json({ error }))
    } catch (error) {
        console.log(error);
    }
}) */

/* const deleteparentNumber = (async (req, res) => {
    try {
        await Parent.findOne({ parentNumber: req.params.parentNumber })
            .then(
                parent => {
                    console.log(parent.parentNumber);
                    console.log(req.body.parentNumber);
                    parent.parentNumber.push(req.body.parentNumber);
                    parent.save()
                        .then(() => res.status(201).json({ message: 'numéro parent ajouté !' }))
                        .catch(error => res.status(400).json({ error }));
                    res.send(parent)
                }
            )
            .catch(error => console.log(error))
        }
    catch (error) {
        console.log(error);
    }
    {
    "parentNumber":"+2250767631044",
    "codeSecurite": "1234"
}
}) */