const redisClient = require('../config/redis');

const Alert = require('../model/Alerts');

exports.createAlert = async (req, res, next) => {
    const { coin, targetPrice } = req.body;
    const alert = await Alert.create({
      userId: req.user.id,
      coin,
      targetPrice,
      status: 'created',
    });
  
    redisClient.publish('new_alert', JSON.stringify(alert));
    res.status(201).json({
      success: true,
      alert,
    });
  };


  exports.deleteAlert = async (req, res, next) => {
    const { id } = req.params;
    const alert = await Alert.findByIdAndDelete(id);
  
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found',
      });
    }
  
    res.status(200).json({
      success: true,
      message: 'Alert deleted successfully',
    });
  };

  
  exports.getAllAlerts = async (req, res, next) => {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { userId: req.user.id };
    if (status) {
      query.status = status;
    }
  
    const alerts = await Alert.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
  
    res.status(200).json({
      success: true,
      alerts,
    });
  };
  