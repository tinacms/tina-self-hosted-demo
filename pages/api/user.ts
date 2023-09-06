import { authManager, makeUserManagementApi, userManager } from "../../tina/auth";

export default makeUserManagementApi(authManager, userManager)
