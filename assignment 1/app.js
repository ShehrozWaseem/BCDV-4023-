var web3;
// Load Web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545')); // Use your Ganache URL
  }
  
  
  // Create the contract instance
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  
  // Function to get the account
  async function getAccount() {
    let accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    console.log('Ganache account detected: ',accounts[0]) ;
    return web3.eth.defaultAccount;
}

  let bugId;
  let bugDesc;
  
  // Function to add a bug
  async function addBug() {
	const bugId = parseInt(prompt("Enter Bug ID:"));

	if(isNaN(bugId)){
		alert("Please Enter a number:");
		return
	}
	const bugDesc = prompt("Enter Bug Description:");
	console.log( web3.eth.defaultAccount)
		try {
			const gasEstimate = await web3.eth.getGasPrice();
			console.log(gasEstimate)
			await contract.methods
				.addBug(+bugId,bugDesc)
				.send({ from: web3.eth.defaultAccount,gas: '1000000', });
				alert('Bug Added Succesfully. It will reload')
				window.location.reload()
		} catch(e) {
			alert('Failed to save bug to blockchain.')
			console.log('Failed to save bug to blockchain.',e);
		}
  }

  async function changeBugStatus(bugIndex, newStatus) {
    try {
        await contract.methods
            .changeStatus(bugIndex, newStatus)
            .send({ from: web3.eth.defaultAccount });

        // Optionally, you can update the UI or display a success message here
        alert(`Bug status updated successfully. Index: ${bugIndex}, New Status: ${newStatus}`);
    } catch (error) {
        alert('Failed to change status of bug. Index:', bugIndex, 'Error:', error);
    }
}
  // You can add more functions for interacting with your smart contract as needed
  
  // Example: Load bugs from the smart contract and display them
  async function loadBugs() {
    const userAddress = await getAccount();

    try {
        const bugs = await contract.methods.getBugs().call({ from: userAddress });
		console.log(bugs)
        const listElement = document.getElementById('list');
        bugs.forEach((bug,index) => {
            const listItem = document.createElement('li');

            // Bug ID
            const bugIdLabel = document.createElement('span');
            bugIdLabel.textContent = `Bug ID: ${bug?.id}`;
            listItem.appendChild(bugIdLabel);

            // Bug Description
            const bugDescLabel = document.createElement('p');
            bugDescLabel.innerHTML = `<b>Bug Desc:</b> ${bug?.description}`;
            listItem.appendChild(bugDescLabel);

            // Status Select
            const statusSelect = document.createElement('select');
            const statusOptions = ['Pending', 'Completed', 'In Progress'];

            statusOptions.forEach((option) => {
                const statusOption = document.createElement('option');
                statusOption.value = option.toLowerCase();
                statusOption.textContent = option;
                statusSelect.appendChild(statusOption);
            });


			listElement.appendChild(listItem);

            // Preselect the status based on the web3 data
            statusSelect.value = bug?.status.toLowerCase();

            // Append the select to the list item
            listItem.appendChild(statusSelect);
			// Submit Button
			const submitButton = document.createElement('button');
			submitButton.textContent = 'Submit Status';
			submitButton.onclick = () => changeBugStatus(index, statusSelect.value);
			listItem.appendChild(submitButton);
            listElement.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading bugs:', error);
    }
}

  
  // Load bugs when the page is ready
  document.addEventListener('DOMContentLoaded', () => {
    loadBugs();
  });
  