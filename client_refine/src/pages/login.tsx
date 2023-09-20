import { useEffect, useRef } from "react";
import { useLogin } from "@refinedev/core";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemedTitleV2 } from "@refinedev/mui";

import {yariga} from '../assets';

import { CredentialResponse } from "../interfaces/google";


// Todo: Update your Google Client ID here
const GOOGLE_CLIENT_ID = "221699032090-3scjv0rajuat02u5euqbld47l77ikqc0.apps.googleusercontent.com";

export const Login: React.FC = () => {
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
                        <img src={yariga} alt="Openin App" />
                    </div>

                    <GoogleButton />


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
