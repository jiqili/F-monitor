const host = `1.15.77.73:8080`,
    baseUrl = `http://${host}`,
    errorPath = `${baseUrl}/error`,
    httpPath = `${baseUrl}/http`,
    userDataPath = `${baseUrl}/userData`,
    performancePath = `${baseUrl}/performance`;

export default {
    "getNoneResourceError": `${errorPath}/getNoneResourceError`,
    "getResourceError": `${errorPath}/getResourceError`,
    "getHTTPError": `${httpPath}/getError`,
    "getSuccessRate": `${httpPath}/getSuccessRate`,
    "getPV":`${userDataPath}/getPV`,
    "getUV":`${userDataPath}/getUV`,
    "getPopularBrowser":`${userDataPath}/getPopularBrowser`,
    "getData":`${performancePath}/getData`,

}