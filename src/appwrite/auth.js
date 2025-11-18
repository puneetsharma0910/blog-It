import { Client, Account, ID } from "appwrite";
import config from '../config/config'

export class AuthService {
  client;
  account;

  constructor() {
    console.log("url", config)
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.projectId);
    this.account = new Account(this.client);
    
  }

  
  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(ID.unique(), email, password, name);

      if (user) {
        return this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  }

  
}

export const authService = new AuthService();

export default AuthService