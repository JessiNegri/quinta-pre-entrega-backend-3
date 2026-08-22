export const getHealth = (req, res) => {
    return res.status(200).json({
        status: "success",
        environment: process.env.NODE_ENV,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
};