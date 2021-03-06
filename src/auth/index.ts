import Core from "../Core";
import type { Image } from "../lib/types";

export type LoginSuccess = { 
	user: {
		id: string,
		username: string,
		profileImage: Image
	},
	needs2FA: false
}
export type Needs2FA = { needs2FA: true }
export type LoginResponse = Promise<LoginSuccess|Needs2FA>

export default class Auth extends Core {
	endpoints = {
		login: "https://www.floatplane.com/api/auth/login",
		factor: "https://www.floatplane.com/api/auth/checkFor2faLogin"
	}

	/**
	 * Login to floatplane using provided credentials.
	 * @param {string} username Username/Email
	 * @param {string} password Password
	 * @returns {LoginResponse} User object OR `{ needs2FA: true }` if user requires 2 Factor authentication.
	*/
	login = async (username: string, password: string): Promise<LoginResponse> => JSON.parse(
		await this.got.post(this.endpoints.login, { 
			method: "POST", 
			json: { username, password },
			resolveBodyOnly: true
		})
	)


	/**
	* Login using provided 2Factor token.
	* @param {string} token
	* @returns {Promise<User>} User object
	*/
	factor = async (token: string): Promise<LoginSuccess> => JSON.parse(
		await this.got.post(this.endpoints.factor, {
			method: "POST",
			json: { token: token.toString() },
			resolveBodyOnly: true
		})
	)
}