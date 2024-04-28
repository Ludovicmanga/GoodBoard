import Typography from "@mui/material/Typography";
import EventNoteIcon from "@mui/icons-material/EventNote";
import styles from './GoodboardLogo.module.scss'


export const GoodboardLogo = () => {
    return (
        <div className={styles.container}>
            <EventNoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
            }}
            >
            GOODBOARD
            </Typography>
        </div>
    )
}