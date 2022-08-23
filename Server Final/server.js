const express = require('express')
const cors = require('cors')
const connection = require('./database');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const corsOptions = {
    origin: "*", // Can specify origin (aws s3 react-app link)
    optionsSuccessStatus: 200, 
    credentials: true
}

app.use(cors(corsOptions));


// ============================== || SAMPLE APIs || ============================= //
app.get("/", (req, res) => {
    res.json({ "message": "hello world" });
});


// ========================================|| NIGEL APIs||======================================== //
// Bidding page CRUD --------------------------------------------------
// Retrieve bidding cars
app.get('/biddingCars', (req, res) => {
    const userId = req.query.id;
    const bidDate = req.query.date;

    const sql = `select bc.BidCarID, bc.CarID, 
                DATE_FORMAT(bc.OrgRegistration, '%d/%m/%Y') OrgRegistration,
                bc.Ownership, bc.Mileage, bc.MinPARF, bc.PaperValue, 
                DATE_FORMAT(bc.COEExpiry, '%d/%m/%Y') COEExpiry,
                DATE_FORMAT(bc.RoadTaxExpiry, '%d/%m/%Y') RoadTaxExpiry,
                bc.VehicleCode, bc.ManuYear, bc.Color, 
                DATE_FORMAT(bc.FirstRegistration, '%d/%m/%Y') FirstRegistration,
                DATE_FORMAT(bc.PARFExpiryDate, '%d/%m/%Y') PARFExpiryDate,
                bc.AccidentFree, bc.PurchaseFrom, bc.VehScheme, bc.COECategory,
                bc.COEPeriod, bc.COE, bc.OMV, bc.ARF,
                DATE_FORMAT(bc.InspectionDue, '%d/%m/%Y') InspectionDue,
                bc.Transmission, bc.EngineNo, bc.ChassisNo, bc.FuelType, bc.EngineCapacity, 
                bc.Power, bc.VehicleAttachment, bc.MaxLadenWeight, bc.UnladenWeight,
                CONCAT_WS( ",", bc.Image1, bc.Image2, bc.Image3, bc.Image4, bc.Image5, bc.Image6) AS CarImageArray,
                /* -------------------------------------------------- */
                c.CarMake, c.CarModel,
                /* -------------------------------------------------- */
                b.BidID, b.ActualBid, b.Depreciation, b.BidStatus,
                DATE_FORMAT(b.SubmitDate, '%d/%m/%Y') SubmitDate,
                DATE_FORMAT(b.BidDate, '%d/%m/%Y') BidDate
                /* -------------------------------------------------- */
                from ((df_bid_cars bc
                left outer join df_cars c on bc.CarID = c.CarID)
                left outer join df_bids b on bc.BidCarID = b.BidCarID and b.UserID = ?)
                where bc.BidDate = ?;`;
 
    connection.query(sql, [userId, bidDate], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

 });

// Create bid
 app.post("/biddingCars", (req, res) => {
    const bidCarId = req.body.bidCarId;
    const userId = req.body.userId;
    const actualBid = req.body.actualBid;
    const depreciation = req.body.depreciation;
    const bidStatus = "pending" // (Won, Lost, Pending)
    const bidDate = "2022-08-12"
    const currentDateTime = new Date()
    const currentDate = currentDateTime.toISOString().split('T')[0]

    let sql = `insert into df_bids (BidCarID, UserID, ActualBid, Depreciation, BidStatus, SubmitDate, BidDate)
                values(?, ?, ?, ?, ?, ?, ?)`

    connection.query(sql, [bidCarId, userId, actualBid, depreciation, bidStatus, currentDate, bidDate], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

});

// Update bid
app.put("/biddingCars", (req, res) => {
    const bidCarId = req.body.bidCarId;
    const userId = req.body.userId;
    const actualBid = req.body.actualBid;
    const depreciation = req.body.depreciation;
    const currentDateTime = new Date()
    const currentDate = currentDateTime.toISOString().split('T')[0]

    let sql = `update df_bids
                set ActualBid = ?, Depreciation = ?, SubmitDate = ?
                where BidCarID = ? and UserID = ?;`

    connection.query(sql, [actualBid, depreciation, currentDate, bidCarId, userId], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

});

// Delete Bid
app.delete("/biddingCars", (req, res) => {
    const bidCarId = req.body.bidCarId;
    const userId = req.body.userId;

    let sql = `delete from df_bids
                where BidCarID = ? and UserID = ?`

    connection.query(sql, [bidCarId, userId], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

});


// Login page CRUD --------------------------------------------------
// Search for email & password, return user details
app.post("/login", (req, res) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    let sql = `select * from df_accounts
                where UserEmail = ? and UserPassword = ?;`

    connection.query(sql, [userEmail, userPassword], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

});


// Manage bids admin page CRUD --------------------------------------------------
// Retrieve bids by date
app.get('/manageBids/:bidDate', (req, res) => {
    const bidDate = req.params.bidDate;

    let sql = `SELECT bc.BidCarID, c.CarMake, c.CarModel, bc.Image1, BidCount.NumOfBids, BidMax.UserID, BidMax.HighestBid, BidCount.BidStatus
                from df_bid_cars bc 
                left outer join df_cars c on bc.CarID = c.CarID
                left outer join (
                    SELECT BidCarID, count(*) as NumOfBids, BidStatus
                    FROM df_bids
                    group by BidCarID) as BidCount on bc.BidCarID = BidCount.BidCarID
                left outer join (
                    SELECT BidCarID, UserID, max(ActualBid) as HighestBid
                    FROM  df_bids
                    group by BidCarID) as BidMax on bc.BidCarID = BidMax.BidCarID
                where BidDate = ?`;
 
    connection.query(sql, [bidDate], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

 });

 // Retrieve users in bid
 app.get('/selectBids/:bidCarId', (req, res) => {
    const bidCarId = req.params.bidCarId;

    let sql = `select b.BidCarID, b.UserID, b.ActualBid, a.UserFirstName, a.UserLastName, b.BidStatus
                from df_bids b
                left outer join df_accounts a on b.UserID = a.UserID
                where BidCarID = ?
                order by b.ActualBid desc;`;
 
    connection.query(sql, [bidCarId], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

 });

// Award bid 
app.put("/awardBid", (req, res) => {
    const bidCarId = req.body.bidCarId;
    const userId = req.body.userId;

    let sql = `update df_bids 
                set BidStatus = "Bid Won"
                where BidCarID = ? and UserId = ?;`

    connection.query(sql, [bidCarId, userId], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

});

// Check awarded bid
app.get('/bidAwarded', (req, res) => {
    const bidCarID = req.query.bidCarId;
    const bidDate = req.query.bidDate;

    let sql = `select BidCarID, UserID, if(BidStatus = "Bid Won", "Bid Awarded", "Pending") as AwardBid
                from df_bids
                where BidCarID = ? and BidStatus = "Bid Won" and BidDate = ?
                order by ActualBid desc
                limit 1;`;
 
    connection.query(sql, [bidCarID, bidDate], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

 });

 // Check unawarded bid
 app.put("/unawardBid", (req, res) => {
    const bidCarId = req.body.bidCarId;
    const userId = req.body.userId;

    let sql = `update df_bids 
                set BidStatus = "pending"
                where BidCarID = ? and UserId = ?;`

    connection.query(sql, [bidCarId, userId], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

});


// ============================== || JIAXIN APIs || ============================= //
app.get('/favourite',function(req,res){
    let sql="SELECT DISTINCT fa.FavouriteID, ca.CarLogo, ca.CarMake, ca.CarModel, DATE_FORMAT(bc.BidDate,'%d-%m-%Y') BidDate FROM df_favourite AS fa JOIN df_cars AS ca ON fa.CarID = ca.CarID LEFT JOIN df_bid_cars AS bc ON fa.CarID = bc.CarID WHERE fa.UserID = 1 GROUP BY fa.CarID;";
    connection.query(sql,function(err,results){
        if(err)throw err;
        res.send(results);
    });
});

app.delete("/deleteFavourite", (req, res) => {
    const favouriteID = req.body.favouriteID
    const sqlDelete = "DELETE FROM df_favourite WHERE FavouriteID = ?;";
    connection.query(sqlDelete, favouriteID, (err, result) => {
        if (err) console.log(err)
    })
});

app.get('/myBids',function(req,res){
    let sql="SELECT bids.ActualBid, cars.CarLogo, cars.CarMake, cars.CarModel, DATE_FORMAT(bc.BidDate,'%Y-%m-%d') BidDate, bids.BidStatus, bc.Image1 FROM df_bids AS bids JOIN df_bid_cars AS bc ON bc.BidCarID = bids.BidCarID JOIN df_cars AS cars ON bc.CarID = cars.CarID WHERE bids.UserID = 1;";
    connection.query(sql,function(err,results){
        if(err)throw err;
        res.send(results);
    });
});

app.get('/bidSummary',function(req,res){
    let sql="SELECT COUNT(DISTINCT BidDate) ParticipatedBatches, COUNT(BidID) SubmittedBids, COUNT(DISTINCT IF(BidStatus = 'Bid Win', BidID, NULL)) AS SuccessfulBids, ROUND(COUNT(BidID) / COUNT(DISTINCT BidDate), 1) AvgBidsPerBatch FROM df_bids AS bids WHERE bids.UserID = 1;";
    connection.query(sql,function(err,results){
        if(err)throw err;
        res.send(results);
    });
});

app.get('/todayBidsSubmitted',function(req,res){
    let sql="SELECT COUNT(bids.BidID) todayBids FROM df_bids AS bids WHERE bids.UserID = 1 AND bids.BidDate = CURDATE();";
    connection.query(sql,function(err,results){
        if(err)throw err;
        res.send(results);
    });
});

app.get('/previewBids',function(req,res){
    let sql="SELECT bc.Image1, cars.CarMake, cars.CarModel, bids.ActualBid FROM df_bids AS bids JOIN df_bid_cars AS bc ON bc.BidCarID = bids.BidCarID JOIN df_cars AS cars ON bc.CarID = cars.CarID WHERE bids.UserID = 1 AND bids.BidDate = CURDATE() LIMIT 2;";
    connection.query(sql,function(err,results){
        if(err)throw err;
        res.send(results);
    });
});

app.get('/curBidCars',function(req,res){
    let sql="SELECT COUNT(bc.BidCarID) curBidCars FROM df_bid_cars AS bc WHERE bc.BidDate = CURDATE();";
    connection.query(sql,function(err,results){
        if(err)throw err;
        res.send(results);
    });
});

app.get('/fixedBidTime',function(req,res){
    let sql="SELECT fbt.StartTime, fbt.EndTime FROM df_fixed_bid_time AS fbt;";
    connection.query(sql,function(err,results){
        if(err)throw err;
        res.send(results);
    });
});

app.get('/addFavList',function(req,res){
    let sql="SELECT car.CarID, car.CarLogo, car.CarMake, car.CarModel, fa.UserID, fa.FavouriteID from df_cars AS car LEFT JOIN df_favourite AS fa  ON car.CarID = fa.CarID ORDER BY car.CarMake asc;";
    connection.query(sql,function(err,results){
        if(err)throw err;
        res.send(results);
    });
});

app.post("/insertFavCar", (req, res) => {
    const CarID = req.body.CarID
    const UserID = req.body.UserID

    const sqlInsert = "INSERT INTO df_favourite (CarID, UserID) VALUES (?, ?);"
    connection.query(sqlInsert, [CarID, UserID], (err, result) => {
        if (err) console.log(err)
    })
});

// Retrieve bidding cars
app.get('/adminBidCars',function(req,res){
    let sql="SELECT bc.BidCarID, bc.Image1, CarLogo, CarMake, CarModel, bc.Ownership, DATE_FORMAT(bc.BidDate,'%Y-%m-%d') BidDate, bc.CarStatus FROM df_bid_cars AS bc LEFT JOIN df_cars AS cars ON bc.CarID = cars.CarID;";
    connection.query(sql,function(err,results){
        if(err)throw err;
        res.send(results);
    });
});

// Insert bidding cars
app.post("/adminInsertBidCars", (req, res) => {
    const carID = req.body.carID;
    const orgRegistration = req.body.orgRegistration;
    const ownership = req.body.ownership;
    const mileage = req.body.mileage;
    const minPARF = req.body.minPARF;
    const paperValue = req.body.paperValue;
    const cOEExpiry = req.body.cOEExpiry;
    const roadTaxExpiry = req.body.roadTaxExpiry;
    const vehicleCode = req.body.vehicleCode;
    const manuYear = req.body.manuYear;
    const color = req.body.color;
    const firstRegistration = req.body.firstRegistration;
    const pARFExpiryDate = req.body.pARFExpiryDate;
    const accidentFree = req.body.accidentFree;
    const purchaseFrom = req.body.purchaseFrom;
    const vehScheme = req.body.vehScheme;
    const cOECategory = req.body.cOECategory;
    const cOEPeriod = req.body.cOEPeriod;
    const COE = req.body.COE;
    const OMV = req.body.OMV;
    const ARF = req.body.ARF;
    const inspectionDue = req.body.inspectionDue;
    const transmission = req.body.transmission;
    const engineNo = req.body.engineNo;
    const chassisNo = req.body.chassisNo;
    const fuelType = req.body.fuelType;
    const engineCapacity = req.body.engineCapacity;
    const power = req.body.power;
    const vehicleAttachment = req.body.vehicleAttachment;
    const maxLadenWeight = req.body.maxLadenWeight;
    const unladenWeight = req.body.unladenWeight;
    const image1 = req.body.image1;
    const image2 = req.body.image2;
    const image3 = req.body.image3;
    const image4 = req.body.image4;
    const image5 = req.body.image5;
    const image6 = req.body.image6;
    const bidDate = req.body.bidDate;
    

    let sql = `INSERT INTO df_bid_cars 
                (CarID, OrgRegistration, Ownership, Mileage, MinPARF, PaperValue, 
                COEExpiry, RoadTaxExpiry, VehicleCode, ManuYear, Color, 
                FirstRegistration, PARFExpiryDate, AccidentFree, PurchaseFrom, 
                VehScheme, COECategory, COEPeriod, COE, OMV, ARF, 
                InspectionDue, Transmission, EngineNo, ChassisNo, FuelType, 
                EngineCapacity, Power, VehicleAttachment, MaxLadenWeight, 
                UnladenWeight, Image1, Image2, Image3, Image4, Image5, Image6, 
                BidDate, CarStatus) VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending');`

    connection.query(sql, [carID, orgRegistration, ownership, mileage, minPARF, paperValue, 
                        cOEExpiry, roadTaxExpiry, vehicleCode, manuYear, color, 
                        firstRegistration, pARFExpiryDate, accidentFree, purchaseFrom, 
                        vehScheme, cOECategory, cOEPeriod, COE, OMV, ARF, 
                        inspectionDue, transmission, engineNo, chassisNo, fuelType, 
                        engineCapacity, power, vehicleAttachment, maxLadenWeight, 
                        unladenWeight, image1, image2, image3, image4, image5, image6, 
                        bidDate], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

});

app.delete("/adminDeleteBidCar", (req, res) => {
    const bidCarID = req.body.bidCarID
    const sqlDelete = "DELETE FROM df_bid_cars WHERE BidCarID = ?;";
    connection.query(sqlDelete, bidCarID, (err, result) => {
        if (err) console.log(err)
    })
});


app.get('/adminBidCarsDetails/:id',function(req,res){
    const BidCarID = req.params.id;
    let sql="SELECT bc.CarID, cars.CarMake, cars.CarModel, DATE_FORMAT(bc.OrgRegistration,'%Y-%m-%d') OrgRegistration, bc.Ownership, bc.Mileage, bc.MinPARF, bc.PaperValue, DATE_FORMAT(bc.COEExpiry,'%Y-%m-%d') COEExpiry, DATE_FORMAT(bc.RoadTaxExpiry,'%Y-%m-%d') RoadTaxExpiry, bc.VehicleCode, bc.ManuYear, bc.Color, DATE_FORMAT(bc.FirstRegistration,'%Y-%m-%d') FirstRegistration, DATE_FORMAT(bc.PARFExpiryDate,'%Y-%m-%d') PARFExpiryDate, bc.AccidentFree, bc.PurchaseFrom, bc.VehScheme, bc.COECategory, bc.COEPeriod, bc.COE, bc.OMV, bc.ARF, DATE_FORMAT(bc.InspectionDue,'%Y-%m-%d') InspectionDue, bc.Transmission, bc.EngineNo, bc.ChassisNo, bc.FuelType, bc.EngineCapacity, bc.Power, bc.VehicleAttachment, bc.MaxLadenWeight, bc.UnladenWeight, bc.Image1, bc.Image2, bc.Image3, bc.Image4, bc.Image5, bc.Image6, DATE_FORMAT(bc.BidDate,'%Y-%m-%d') BidDate, bc.CarStatus FROM df_bid_cars as bc JOIN df_cars as cars on bc.CarID = cars.CarID WHERE BidCarID = ?;";
    connection.query(sql,[BidCarID],function(err,results){
        if(err)throw err;
        res.send(results);
    });
});

// Update bid
app.put('/updateCars/:id', (req, res) => {
    const orgRegistration = req.body.orgRegistration;
    const ownership = req.body.ownership;
    const mileage = req.body.mileage;
    const minPARF = req.body.minPARF;
    const paperValue = req.body.paperValue;
    const cOEExpiry = req.body.cOEExpiry;
    const roadTaxExpiry = req.body.roadTaxExpiry;
    const vehicleCode = req.body.vehicleCode;
    const manuYear = req.body.manuYear;
    const color = req.body.color;
    const firstRegistration = req.body.firstRegistration;
    const pARFExpiryDate = req.body.pARFExpiryDate;
    const accidentFree = req.body.accidentFree;
    const purchaseFrom = req.body.purchaseFrom;
    const vehScheme = req.body.vehScheme;
    const cOECategory = req.body.cOECategory;
    const cOEPeriod = req.body.cOEPeriod;
    const COE = req.body.COE;
    const OMV = req.body.OMV;
    const ARF = req.body.ARF;
    const inspectionDue = req.body.inspectionDue;
    const transmission = req.body.transmission;
    const engineNo = req.body.engineNo;
    const chassisNo = req.body.chassisNo;
    const fuelType = req.body.fuelType;
    const engineCapacity = req.body.engineCapacity;
    const power = req.body.power;
    const vehicleAttachment = req.body.vehicleAttachment;
    const maxLadenWeight = req.body.maxLadenWeight;
    const unladenWeight = req.body.unladenWeight;
    const bidDate = req.body.bidDate;
    const BidCarID = req.params.id;

    let sql = `update df_bid_cars
                set orgRegistration=?, ownership=?, mileage=?, minPARF=?, paperValue=?, 
                cOEExpiry=?, roadTaxExpiry=?, vehicleCode=?, manuYear=?, color=?, 
                firstRegistration=?, pARFExpiryDate=?, accidentFree=?, purchaseFrom=?, 
                vehScheme=?, cOECategory=?, cOEPeriod=?, COE=?, OMV=?, ARF=?, 
                inspectionDue=?, transmission=?, engineNo=?, chassisNo=?, fuelType=?, 
                engineCapacity=?, power=?, vehicleAttachment=?, maxLadenWeight=?, 
                unladenWeight=?, bidDate=?
                where BidCarID = ?;`

    connection.query(sql, [orgRegistration, ownership, mileage, minPARF, paperValue, cOEExpiry, roadTaxExpiry, vehicleCode, manuYear, color, firstRegistration, pARFExpiryDate, accidentFree, purchaseFrom, vehScheme, cOECategory, cOEPeriod, COE, OMV, ARF, inspectionDue, 
                            transmission, engineNo, chassisNo, fuelType, engineCapacity, power, vehicleAttachment, maxLadenWeight, unladenWeight, bidDate, BidCarID], (err, results) => {
        if(err)throw err;
        res.send(results);
    });

});


// Local server (comment out before upload to aws)
 app.listen(5000,function(){
    console.log('App Listening on port 5000');
    connection.connect(function(err){
        if(err)throw err;
        console.log('Database connected!');
  })
});

module.exports = app;
