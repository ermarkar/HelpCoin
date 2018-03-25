var path = require("path");
var _ = require("underscore");

module.exports = function (router) {
    var customAds = require("../data/custom_ads.json");

    /**
     * To get the list of available and active custom ads
     */
    router.get("/customads", (req, res) => {
        var validMinAds = _.filter(customAds.minAds, (minAd) => {
            return new Date(minAd.endDate) > new Date();
        });

        var validFullAds = _.filter(customAds.fullAds, (fullAd) => {
            return new Date(fullAd.endDate) > new Date();
        });

        var customAds = { minAds: validMinAds, fullAds: validFullAds };
        res.json(customAds);
    });

    /**
     * Server the ad based on device, size and id
     */
    router.get("/getad/:size/:device/:id", (req, res) => {
        var filePath = path.join(__dirname, "..", "..", process.env.STORAGE_IMAGE,
            ((req.params.id + "_banner_" + req.params.size + "_" + req.params.device + ".jpg")));
        res.sendFile(filePath);
    });

    /**
     * To serve the random ad by getting the random ad id from active ads, but requires device and size
     */
    router.get("/randomad/:size/:device", (req, res) => {
        var validAds = {};
        // get the valid ads based on size
        if (req.params.size === "full") {
            validAds = _.filter(customAds.fullAds, (fullAd) => {
                return new Date(fullAd.endDate) >= new Date();
            });
        } else {
            validAds = _.filter(customAds.minAds, (minAd) => {
                return new Date(minAd.endDate) >= new Date();
            });
        }

        if (validAds.length > 0) {
            // extract the array of valid ids
            var adIds = _.pluck(validAds, "id");
            var randomAdId = adIds[Math.floor(Math.random() * adIds.length)];

            var filePath = path.join(__dirname, "..", "..", process.env.STORAGE_IMAGE,
                ((randomAdId + "_banner_" + req.params.size + "_" + req.params.device + ".jpg")));

            res.sendFile(filePath);
        } else {
            res.json({ message: "No Data found." })
        }

    });

    return router;
};