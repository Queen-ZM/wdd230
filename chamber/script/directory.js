document.addEventListener("DOMContentLoaded", function () {
    const membersContainer = document.getElementById("members-container");
    const gridViewToggle = document.getElementById("grid-view");
    const listViewToggle = document.getElementById("list-view");
  
    gridViewToggle.addEventListener("change", toggleView);
    listViewToggle.addEventListener("change", toggleView);
  
    function toggleView() {
      membersContainer.classList.toggle("grid-view", gridViewToggle.checked);
      membersContainer.classList.toggle("list-view", listViewToggle.checked);
    }
  
    // Fetch and display members from JSON
    fetch("data/members.json")
      .then(response => response.json())
      .then(data => displayMembers(data.members));
  });
  
  function displayMembers(members) {
    const membersContainer = document.getElementById("members-container");
    membersContainer.innerHTML = "";
  
    members.forEach(member => {
      const memberElement = document.createElement("div");
      memberElement.classList.add(membersContainer.classList.contains("grid-view") ? "member-card" : "member-list-item");
  
      memberElement.innerHTML = `
        <h3>${member.name}</h3>
        <p>Address: ${member.address}</p>
        <p>Phone: ${member.phone}</p>
        <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
        <img src="images/${member.image}" alt="${member.name} Logo">
        <p>Membership Level: ${member.membershipLevel}</p>
        <p>${member.otherInfo}</p>
      `;
  
      membersContainer.appendChild(memberElement);
    });
  }