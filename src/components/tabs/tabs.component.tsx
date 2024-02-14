import { ReactNode } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme, useMediaQuery } from '@mui/material';
interface TabPanelProps {
  children?: ReactNode;
  index?: number;
  value?: number;
  label?: string | ReactNode;
}
export const CustomTab = ({ children, tabValue, setTabValue, classes }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const tabChildren = Array.isArray(children) ? children : [children];
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 'unset',
          borderColor: 'divider',
          margin: isMobile ? '40px auto !important' : '40px auto !important',
        }}
        className={classes?.muiBox}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          sx={{
            border: '1px solid rgba(0, 0, 0, 0.20)',
            borderRadius: '12px!important'
          }}
          className={classes?.tabs}
        >
          {tabChildren?.map((child, index) => (
            <Tab key={index} label={child?.props?.label} />
          ))}
        </Tabs>
      </Box>
      {tabChildren?.map((child, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={tabValue !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          {tabValue === index && (
            <Typography component="div">{child}</Typography>
          )}
        </div>
      ))}
    </Box>
  );
}
export const CustomTabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Typography component={"div"}>{children}</Typography>
      )}
    </div>
  );
}