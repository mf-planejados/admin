import { Typography } from "@mui/material";
import { Colors } from "../organisms";

export const Text = (props) => {

   const {
      children,
      light = false,
      bold = false,
      small = false,
      large = false,
      title = false,
      style = {}
   } = props;

   return (
      <Typography
         {...props}
         sx={{
            fontFamily: 'InterRegular',
            fontSize: { xs: `12px`, xm: `15px`, md: `15px`, lg: `15px` },
            color: Colors.darkBlueText,
            ...(light && { fontFamily: 'InterLight' }),
            ...(bold && { fontFamily: 'InterSemiBold' }),
            ...(small && { fontSize: { xs: `10px`, sm: `13px`, md: `13px`, lg: `13px` } }),
            ...(large && { fontSize: { xs: `15px`, sm: `18px`, md: `18px`, lg: `18px` } }),
            ...(title && { fontSize: { xs: `18px`, sm: `22px`, md: `22px`, lg: `22px` } }),
            ...style
         }}
      >
         {children}
      </Typography>
   )
}