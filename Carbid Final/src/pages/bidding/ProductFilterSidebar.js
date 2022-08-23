// material-ui
import {
	Box,
	Radio,
	Stack,
	Button,
	Drawer,
	Divider,
	Checkbox,
	FormGroup,
	IconButton,
	Typography,
	RadioGroup,
	FormControlLabel,
} from '@mui/material';

// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { ColorManyPicker } from '../../components/color-utils';

// ========================================|| BIDDING PAGE (AddDetailsDropdown) HARDCODED DATA ||======================================== //
const FILTER_PRICE_OPTIONS = [
	{ value: 'below', label: 'Below $150K' },
	{ value: 'between', label: 'Between $150K - $300K' },
	{ value: 'above', label: 'Above $300K' },
];

const FILTER_COLOR_OPTIONS = [
	'#00AB55',
	'#000000',
	'#FFFFFF',
	'#FFC0CB',
	'#FF4842',
	'#1890FF',
	'#94D82D',
	'#FFC107',
];


// ========================================|| BIDDING PAGE (AddDetailsDropdown) FUNCTIONS ||======================================== //
const ProductFilterSidebar = ({ sorts, isOpenFilter, onOpenFilter, onCloseFilter, handleSortByPriceAsc, handleSortByRegistrationDateAsc, handleSortByManufacturingDateAsc}) => {


// ========================================|| BIDDING PAGE (AddDetailsDropdown) RENDER ||======================================== //
	return (
		<>
			<Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
				Filters / Sorts
				&nbsp;
			</Button>

			<Drawer
				anchor="right"
				open={isOpenFilter}
				onClose={onCloseFilter}
				PaperProps={{
					sx: { width: 280, border: 'none', overflow: 'hidden' },
				}}
			>
            	{/* Filters / Sorts tile -------------------------------------------------- */}
				<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
					<Typography variant="subtitle1" sx={{ ml: 1 }}>
						Filters / Sorts
					</Typography>
					<IconButton onClick={onCloseFilter}>
						<Iconify icon="eva:close-fill" width={20} height={20} />
					</IconButton>
				</Stack>

				<Divider />
				
				<Scrollbar>
					<Stack spacing={3} sx={{ p: 3 }}>
            			{/* Sort by functions -------------------------------------------------- */}
						<div> 
							{/* TITLE */}
							<Typography variant="subtitle1" gutterBottom>
								Sort by
							</Typography>

							<FormGroup>
								{/* PRICE SORT */}
								{
								sorts["sortByPrice"] ? 
								<FormControlLabel key="Price" control={<Checkbox />} label="Price" onChange={handleSortByPriceAsc} checked={true}/> :
								<FormControlLabel key="Price" control={<Checkbox />} label="Price" onChange={handleSortByPriceAsc}/>
								}

								{/* REGISTRATION DATE SORT */}
								{
								sorts["sortByOrgRegistration"] ? 
								<FormControlLabel key="Registration Date" control={<Checkbox />} label="Registration Date" onChange={handleSortByRegistrationDateAsc} checked={true}/> :
								<FormControlLabel key="Registration Date" control={<Checkbox />} label="Registration Date" onChange={handleSortByRegistrationDateAsc}/>
								}

								{/* MANUFACTURING DATE SORT */}
								{
								sorts["sortByManuYear"] ? 
								<FormControlLabel key="Manufacturing Date" control={<Checkbox />} label="Manufacturing Date" onChange={handleSortByManufacturingDateAsc} checked={true}/> :
								<FormControlLabel key="Manufacturing Date" control={<Checkbox />} label="Manufacturing Date" onChange={handleSortByManufacturingDateAsc}/>
								}
								
							</FormGroup>
						</div> 
						

						{/* Filter by functions -------------------------------------------------- */}
						{/* TITLE */}
						<Typography variant="subtitle1" gutterBottom>
								Filter by
						</Typography>
						
						{/* PRICE FILTER */}
						<div>
							<RadioGroup>
								{FILTER_PRICE_OPTIONS.map((item) => (
									<FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
								))}
							</RadioGroup>
						</div>

						{/* COLOR FILTER */}
						<div>
							<ColorManyPicker
								name="colors"
								colors={FILTER_COLOR_OPTIONS}
								onChecked={(color) => [].includes(color)}
								sx={{ maxWidth: 38 * 4 }}
							/>
						</div>

					</Stack>
				</Scrollbar>


				{/* Clear all functions -------------------------------------------------- */}
				<Box sx={{ p: 3 }}>
					<Button
						fullWidth
						size="large"
						type="submit"
						color="inherit"
						variant="outlined"
						startIcon={<Iconify icon="ic:round-clear-all" />}
					>
						Clear All
					</Button>
				</Box>
			</Drawer>
		</>
	);

}

export default ProductFilterSidebar;
