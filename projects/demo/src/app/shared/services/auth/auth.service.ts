import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoggedInUser } from "../../models/logged-in-user";
import { AuthQuery, AuthStore } from "./auth.store";
import { filter } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private authStore: AuthStore) {
        this.setUser();
    }

    private setUser() {

        const loggedInUser = new LoggedInUser();
        loggedInUser.UserName = "testu";
        loggedInUser.Email = "test@nix.de";
        loggedInUser.Roles = ['user'];
        loggedInUser.FirstName = 'First';
        loggedInUser.LastName = 'Last';
        loggedInUser.DisplayName = "Last, First";

        this.authStore.update(state => state = {
                        LoggedInUser: loggedInUser
                    })
       

    }

    private clearUser() {
        this.authStore.update(state => state = {
            LoggedInUser: new LoggedInUser()
        })
    }


    LogIn() {

    }

    LogOut() {

    }

}