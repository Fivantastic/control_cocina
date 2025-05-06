import React from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    Chip,
    Divider,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Inventory as InventoryIcon,
    Assessment as AssessmentIcon,
    Settings as SettingsIcon,
    RestaurantMenu as RestaurantMenuIcon,
    LocalShipping as LocalShippingIcon,
    Business as BusinessIcon,
    ArrowDropDown as ArrowDropDownIcon,
    LocationOn as LocationOnIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useClinic } from '../contexts/ClinicContext';

const drawerWidth = 240;

const MainLayout: React.FC = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedClinic, clinics, setSelectedClinic } = useClinic();
    
    // Estado para el menú de selección de clínica
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleClinicChange = (clinicId: number) => {
        const clinic = clinics.find(c => c.id === clinicId);
        if (clinic) {
            setSelectedClinic(clinic);
        }
        handleClose();
    };

    const menuItems = [
        { text: 'Inventario', icon: <InventoryIcon />, path: '/productos' },
        { text: 'Menús', icon: <RestaurantMenuIcon />, path: '/menus' },
        { text: 'Proveedores', icon: <BusinessIcon />, path: '/proveedores' },
        { text: 'Albaranes', icon: <LocalShippingIcon />, path: '/notas-de-entrega' },
        { text: 'Pacientes', icon: <PeopleIcon />, path: '/pacientes' },
        { text: 'Reportes', icon: <AssessmentIcon />, path: '/reportes' },
        { text: 'Configuración', icon: <SettingsIcon />, path: '/configuracion' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Kitchen Manager
                </Typography>
            </Toolbar>
            <Divider />
            {selectedClinic && (
                <Box sx={{ p: 2 }}>
                    <Chip
                        icon={<LocationOnIcon />}
                        label={selectedClinic.name}
                        color="primary"
                        variant="outlined"
                        sx={{ width: '100%', justifyContent: 'flex-start' }}
                    />
                </Box>
            )}
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            selected={
                                item.path === '/' 
                                    ? location.pathname === '/' 
                                    : location.pathname.startsWith(item.path)
                            }
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Kitchen Manager
                    </Typography>
                    
                    {selectedClinic && (
                        <>
                            <Button
                                color="inherit"
                                onClick={handleClick}
                                endIcon={<ArrowDropDownIcon />}
                                startIcon={<LocationOnIcon />}
                            >
                                {selectedClinic.name}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                {clinics.map((clinic) => (
                                    <MenuItem 
                                        key={clinic.id}
                                        onClick={() => handleClinicChange(clinic.id)}
                                        selected={clinic.id === selectedClinic.id}
                                    >
                                        {clinic.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: '64px',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
