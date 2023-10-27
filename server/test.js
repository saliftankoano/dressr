import axios from 'axios';

async function fetchWardrbe(userId) {
	try {
		const response = await axios.get('/api/fetchWardrbe', {
		params: { userId },
		});

		if (response.status === 200) {
		if (response.data.wardrbe) {
			// Wardrobe data fetched successfully
			console.log('Wardrobe fetched successfully');
			return response.data.wardrbe;
		} else {
			console.error('Failed to fetch the wardrobe');
		}
		} else {
		console.error('Request failed with status:', response.status);
		}
	} catch (error) {
		console.error('Error fetching the wardrobe:', error);
	}
	return null; // Return an appropriate value when the fetch fails
}
fetchWardrbe(27496)