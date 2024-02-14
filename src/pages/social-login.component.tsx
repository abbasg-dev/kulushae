import { Box } from "@mui/material"
import { Connect } from 'interfaces/footer.model';
import Icons from "assets/icons";
import { Link } from "react-router-dom";
import * as ROUTES from 'constants/routes';
import { useTranslation } from "react-i18next";
const SocialAuthentication = () => {
    const { t } = useTranslation("common");
    const socialNetwork: Connect[] = [
        {
            name: 'Facebook',
            logo: <Icons.FACEBOOK_AUTH />,
        },
        {
            name: 'Google',
            logo: <Icons.GOOGLE_AUTH />,
        },
        {
            name: 'Apple',
            logo: <Icons.APPLE />,
        },
    ];
    return (
        <>
            <Box display='flex' alignItems='center' position='relative' height={90}>
                {socialNetwork.map((item: Connect, index: number) => (
                    <Box
                        key={index}
                        sx={{ cursor: 'pointer', background: "#FFF" }}
                        alignItems={'center'}
                        display={'flex'}
                        justifyContent={'center'}
                        position={'relative'}
                        width={80}
                    >{item.logo}</Box>
                ))}
            </Box>
            <Link
                style={{
                    textDecoration: "unset",
                    color: "#000",
                    fontSize: 14,
                    cursor: "pointer"
                }}
                to={ROUTES.REGISTER}
            >{t('authentication.login.create_account')}</Link>
        </>
    )
}
export default SocialAuthentication