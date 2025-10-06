import { Client, Account, ID } from "appwrite";

import config from "../config/config";

export class AuthService {
  client;
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.projectId); // Replace with your project ID
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name,
      });

      if (user) {
        this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const result = await this.account.createEmailPasswordSession({
        email : email,
        password: password,
      });
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
  try {
    const user = await this.account.get();
    
    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

}

export const authService = new AuthService();
