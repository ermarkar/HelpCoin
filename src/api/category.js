const db = require("../db/db-connect");
module.exports = function (router) {
    /**
     * To get the categories
     */
    router.get("/categories", (req, res) => {
        var query = "select * from get_needy_categories() as data;";
        db.query(query, (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(result[0].data);
            }
        });
    });
    return router;
};