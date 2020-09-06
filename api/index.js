const Core = require('../core.js')

module.exports = class Api extends Core {
	endpoints = {
		edges: "https://www.floatplane.com/api/edges"
	}

	/**
	 * Fetch edges from the floatplane api
	 * @returns {Promise<{
		edges: Array<{
			hostname: string,
			queryPort: number,
			bandwidth: number,
			allowDownload: boolean,
			allowStreaming: boolean,
			datacenter: {
				countryCode: string,
				regionCode: string,
				latitude: number,
				longitude: number
			}
		}>,
		client: {
			ip: string,
			country_code: string,
			country_name: string,
			region_code: string,
			region_name: string,
			city: string,
			zip_code: string,
			time_zone: string,
			latitude: number,
			longitude: number,
			metro_code: number
		}
	}>}
	 */
	edges = async () => this._middleware(await this.got(this.endpoints.edges))
}