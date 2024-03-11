// APIとつなげる
export async function getDB(authToken, databaseId) {
    try {
        const endpoint = `https://api.notion.com/v1/databases/${databaseId}/query`;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Notion-Version': '2022-06-28'
            }
        };

        const response = await fetch(endpoint, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}