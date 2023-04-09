import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const Redirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const redirectUri = "http://127.0.0.1:3000/authorized";

    useEffect(() => {
        if (searchParams?.get('code')) {
            const code = searchParams?.get('code');
            const client = 'client';
            const secret = 'secret';
            const headers = new Headers();
            headers.set('Content-type', 'application/json');
            headers.set('Authorization', `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`)

            const verifier = sessionStorage.getItem('codeVerifier');
            
            const initialUrl = `http://localhost:8000/oauth2/token?client_id=client&redirect_uri=${redirectUri}&grant_type=authorization_code`;
            const url = `${initialUrl}&code=${code}&code_verifier=${verifier}`;

            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers
            }).then(async (response) => {
                const token = await response.json();
                if (token?.access_token) {
                    sessionStorage.setItem('id_token', token.access_token);
                    navigate('/home');
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }, []); // TODO: why add []?

    useEffect(() => {
        if (!searchParams?.get('code')) {
            const codeChallenge = sessionStorage.getItem('codeChallenge');
            const link = `http://localhost:8000/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
            window.location.href = link; // sessionStorage lost
        }
    }, []);
    return <p>Redirecting ...</p>
}
export default Redirect;