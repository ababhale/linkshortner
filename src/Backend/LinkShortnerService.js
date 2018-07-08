var JsonDB = require('node-json-db');
var db = new JsonDB('LinkShortnerDB.json', true, true);
var _ = require('lodash');

const ERROR_CODES = {
	LINK_EXISTS: {
		CODE: '01',
		MSG: 'Link already exists. Please choose some other link' 
	},
	RETRIEVE_ERROR: {
		CODE: '02',
		MSG: 'Error in retrieving records'
	},
	LINK_NOT_EXISTS: {
		CODE: '03',
		MSG: 'Link does not exists'
	}
}
var LinkShortnerService = {
	createLink: function (newLinkDetails) {
		var result = {
			status: '00',
			msg: 'Success',
			isSuccess: true
		};
		var key = '/links/' + newLinkDetails.newLink;

		if (this._retrieveSingleLink(key)) {
			result.status = ERROR_CODES.LINK_EXISTS.CODE;
			result.msg = ERROR_CODES.LINK_EXISTS.MSG;
			result.isSuccess = false;
			return result;
		}
		
		var obj = {
			hash: newLinkDetails.newLink,
			createtionDate: Date(),
			redirectTo: newLinkDetails.originalLink,
			validTill: newLinkDetails.expiryDays
		}
		db.push(key, obj);
		result.data = obj;
		return result;
	},

	_retrieveSingleLink: function (key) {
		var existingLink = null;
		try {
			existingLink = db.getData(key);
		} catch(e) {
			console.log('Link does not exisits');
			console.log(e);
		}		
		return existingLink;
	},

	retrieveSingleLink: function (link) {
		var result = {
			status: '00',
			msg: 'Success',
			isSuccess: true
		};
		try {
			var key = '/links/' + link;
			var existingLink = this._retrieveSingleLink(key);
			var statistics = {
				'byBrwoser': [],
				'byDeviceType': [],
				'byOs': []
			}
			var accessCnt = existingLink.access ? existingLink.access.length : 0;
			if (existingLink.access) {
				var browserStats = _.groupBy(existingLink.access, function (obj) {
					return obj.userstats.browser;
				});
				_.each(browserStats, function (value, key) {
					statistics.byBrwoser.push({
						key: key,
						value: value.length
					})
				});

				var deviceStats = _.groupBy(existingLink.access, function (obj) {
					if (obj.userstats.isDesktop) {
						return 'Desktop';
					} else if (obj.userstats.isMobile) {
						return 'Mobile'
					} else if (obj.userstats.isTablet) {
						return 'Tablet';
					}
				});

				_.each(deviceStats, function (value, key) {
					statistics.byDeviceType.push({
						key: key,
						value: value.length
					})
				});

				var osStats = _.groupBy(existingLink.access, function (obj) {
					return obj.userstats.os;
				});

				_.each(osStats, function (value, key) {
					statistics.byOs.push({
						key: key,
						value: value.length
					})
				});
			}

			var newObj = {
				accessCnt: accessCnt,
				hash: existingLink.hash,
				createtionDate: existingLink.createtionDate,
				redirectTo: existingLink.redirectTo,
				validTill: existingLink.validTill,
				userstats: statistics
			};

			result.data = newObj;
		} catch (e) {
			result.status = ERROR_CODES.LINK_NOT_EXISTS.CODE;
			result.msg = ERROR_CODES.LINK_NOT_EXISTS.MSG;
			result.isSuccess = false;
			return result;
		}
		
		return result;
	},

	retrieveAllLinks: function () {
		var result = {
			status: '00',
			msg: 'Success',
			isSuccess: true
		};
		try {
			var links = db.getData('/links');
			var linksArray = _.chain(links).values().map((obj, index) => {
				var accessCnt = obj.access ? obj.access.length : 0;
				var newObj = {
					accessCnt: accessCnt,
					hash: obj.hash,
					createtionDate: obj.createtionDate,
					redirectTo: obj.redirectTo,
					validTill: obj.validTill
				};
				return newObj;
			})
			.sortBy((obj) => {
				return -(obj.accessCnt);
			})
			.value();
			result.data = linksArray;
		} catch (e) {
			result.status = ERROR_CODES.RETRIEVE_ERROR.CODE;
			result.msg = ERROR_CODES.RETRIEVE_ERROR.MSG;
			result.isSuccess = false;
			return result;
		}
		
		return result;
	},

	getAndLogLinkRetrieval: function (link, userstats) {
		var result = {
			status: '00',
			msg: 'Success',
			isSuccess: true
		};
		var key = '/links/' + link;
		var existingLink = this._retrieveSingleLink(key);
		if (!existingLink) {
			result.status = ERROR_CODES.LINK_NOT_EXISTS.CODE;
			result.msg = ERROR_CODES.LINK_NOT_EXISTS.MSG;
			result.isSuccess = false;
		} else {
			key = key + '/access[]';
			var obj = {
				accessDate: Date(),
				userstats: userstats
			}
			db.push(key, obj);
			result.data = existingLink;
		}
		return result;
	}
}
module.exports = LinkShortnerService;