import { useEffect, useRef } from "react";
import { useLogin } from "@refinedev/core";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemedTitleV2 } from "@refinedev/mui";

import {openin_app_logo} from '../assets';
import "../index.css";

import { CredentialResponse } from "../interfaces/google";


// Todo: Update your Google Client ID here
const GOOGLE_CLIENT_ID = "221699032090-3scjv0rajuat02u5euqbld47l77ikqc0.apps.googleusercontent.com";

export const Login: React.FC = () => {
    const signinBtnClick = (event: React.MouseEvent<HTMLElement>) => {
        alert("Please try to signin with google.");
    };
    const { mutate: login } = useLogin<CredentialResponse>();

    const GoogleButton = (): JSX.Element => {
        const divRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (
                typeof window === "undefined" ||
                !window.google ||
                !divRef.current
            ) {
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    ux_mode: "popup",
                    client_id: "221699032090-3scjv0rajuat02u5euqbld47l77ikqc0.apps.googleusercontent.com",
                    callback: async (res: CredentialResponse) => {
                        if (res.credential) {
                            login(res);
                        }
                    },
                });
                window.google.accounts.id.renderButton(divRef.current, {
                    theme: "filled_blue",
                    size: "medium",
                    type: "standard",
                });
            } catch (error) {
                console.log(error);
            }
        }, []);

        return <div ref={divRef} />;
    };


    
        return (
            <Box
                component="div"
                sx={{ backgroundColor:'#FCFCFC' }}
            >
                <Container
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                <Box
                    display="flex"
                    gap="36px"
                    justifyContent="center"
                    flexDirection="column"
                >
                    {/* <ThemedTitleV2
                    collapsed={false}
                    wrapperStyles={{
                        fontSize: "22px",
                        justifyContent: "center",
                    }}
                    /> */}
                    <div>
                        <img src={openin_app_logo} alt="Openin App" />
                        <Typography align="left" color="#000000" fontSize="24px">Sign In</Typography>
                        <Typography align="left" color="#000000" fontSize="12px">Sign in to your account</Typography>
                    </div>

                    <div>
                        <label htmlFor="email" style={{ color: "#000000", fontSize:"12px" }}>Email address</label>
                        <br />
                        <input type="email" id="email" className="input_field"/>
                        <br/>
                        <label htmlFor="password" style={{ color: "#000000", fontSize:"12px"}}>Password</label>
                        <br />
                        <input type="password" id="password" className="input_field"/>
                        <Typography fontSize="12px"><a href="#" style={{ color: "#4285F4" }}>Forgot password?</a></Typography>
                        <br />
                        <button className="signin_btn" onClick={signinBtnClick} type="submit">Sign In</button>
                        <br />
                        <div className="googleBtn">
                            <GoogleButton />
                        </div>
                    </div>

                    <div>
                        <Typography fontSize="12px" color="#858585">Don't have an account? <span><a href="#" style={{ color: "#4285F4" }}>Register here</a></span></Typography>
                    </div>

                    {/* <Typography align="center" color={"text.secondary"} fontSize="12px">
                    Powered by
            <img
                style={{ padding: "0 5px" }}
                alt="Google"
                src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
            />
            Google
                    </Typography> */}
                </Box>
                </Container>
            </Box>
        );



};
