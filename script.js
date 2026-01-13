let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let recentCalls = JSON.parse(localStorage.getItem("recentCalls")) || [];

function addContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const photo = document.getElementById("photo").files[0];

    if (!name || !phone || !email) {
        alert("Fill all fields");
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        contacts.push({
            id: Date.now(),
            name,
            phone,
            email,
            photo: reader.result
        });
        save();
    };
    reader.readAsDataURL(photo);
}

function save() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts(contacts);
}

function displayContacts(list) {
    const div = document.getElementById("contactList");
    div.innerHTML = "";

    list.forEach(c => {
        div.innerHTML += `
            <div class="contact">
                <img src="${c.photo}">
                <h4>${c.name}</h4>
                <a href="tel:${c.phone}" onclick="addRecent('${c.name}', '${c.phone}')">📞 ${c.phone}</a>
                <a href="mailto:${c.email}">📧 ${c.email}</a>
                <span class="delete" onclick="deleteContact(${c.id})">❌ Delete</span>
            </div>
        `;
    });
}

function deleteContact(id) {
    contacts = contacts.filter(c => c.id !== id);
    save();
}

function searchContact(text) {
    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(text.toLowerCase())
    );
    displayContacts(filtered);
}

function addRecent(name, phone) {
    recentCalls.unshift(`${name} - ${phone}`);
    recentCalls = recentCalls.slice(0, 5);
    localStorage.setItem("recentCalls", JSON.stringify(recentCalls));
    showRecent();
}

function showRecent() {
    document.getElementById("recentCalls").innerHTML =
        recentCalls.map(r => `<p>${r}</p>`).join("");
}

displayContacts(contacts);
showRecent();
