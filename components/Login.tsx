import Auth from '../interfaces/auth';
import { useState, useEffect } from 'react';
import AuthModel from '../models/auth';
import AuthFields from './AuthFields';

export default function Login({route, navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});
    // let { reload } = route.params || false;

    // if (reload) {
    //     reloadLogin();
    // }

    // async function reloadLogin() {
    //     setIsLoggedIn(await AuthModel.loggedIn());
    //     route.params = false;
    // }

    // useEffect(() => {
    //     reloadLogin();
    // }, []);

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);

            setIsLoggedIn(true);
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    );
};