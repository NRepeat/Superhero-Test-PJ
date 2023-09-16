const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 5000;
export default {
	publicImgURL:`http://${serverIP}:${serverPort}/images/`,
}