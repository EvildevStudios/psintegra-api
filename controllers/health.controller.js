const os = require("os");
const { version } = require("../package.json");
const { getRequestCount } = require("../middlewares/requestCount");

const getUptime = () => {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor(((uptime % 86400) % 3600) / 60);
    const seconds = Math.floor(((uptime % 86400) % 3600) % 60);

    const uptimeObj = {
        days,
        hours,
        minutes,
        seconds,
    };

    return uptimeObj;
};

const getMemoryUsage = () => {
    const memoryUsage = process.memoryUsage();

    const memoryUsageObj = {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external,
        arrayBuffers: memoryUsage.arrayBuffers,
    };

    return memoryUsageObj;
};

const getSystemLoad = () => {
    const systemLoad = os.loadavg();

    return {
        oneMinute: systemLoad[0],
        fiveMinutes: systemLoad[1],
        fifteenMinutes: systemLoad[2],
    };
};

const getHealth = async (req, res) => {
    const uptime = getUptime();
    const requestCount = getRequestCount();
    const memoryUsage = getMemoryUsage();
    const systemLoad = getSystemLoad();

    res.status(200).json({
        status: "OK",
        uptime,
        requestCount,
        memoryUsage,
        systemLoad,
        version,
    });
};

module.exports = { getHealth };
