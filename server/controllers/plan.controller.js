import Plan from '../models/Plan.model.js';

export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ price: 1 });

    res.status(200).json({
      success: true,
      message: 'Plans retrieved successfully',
      data: plans,
    });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving plans',
      error: error.message,
    });
  }
};

export const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Plan retrieved successfully',
      data: plan,
    });
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving plan',
      error: error.message,
    });
  }
};