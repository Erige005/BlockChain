    // ============================================================
    // 1. CẤU HÌNH HỆ THỐNG
    // ============================================================

    // !!! DÁN ĐỊA CHỈ CONTRACT MỚI NHẤT VÀO DƯỚI ĐÂY !!!
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

    const contractABI = [
    // Events
    { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "string", "name": "fileHash", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "CopyrightRegistered", "type": "event" },
    { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "fileHash", "type": "string" } ], "name": "CopyrightSold", "type": "event" },
    { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "fileHash", "type": "string" }, { "indexed": false, "internalType": "address", "name": "user", "type": "address" } ], "name": "FileLiked", "type": "event" },
    { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "fileHash", "type": "string" }, { "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "string", "name": "content", "type": "string" } ], "name": "CommentAdded", "type": "event" },
    { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "fileHash", "type": "string" } ], "name": "ListingCanceled", "type": "event" },

    // Functions
    { "inputs": [{ "internalType": "string", "name": "_fileHash", "type": "string" }, { "internalType": "string", "name": "_content", "type": "string" }], "name": "addComment", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allFileHashes", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "string", "name": "_fileHash", "type": "string" }], "name": "buyCopyright", "outputs": [], "stateMutability": "payable", "type": "function" },
    { "inputs": [{ "internalType": "string", "name": "_fileHash", "type": "string" }], "name": "cancelListing", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "string", "name": "_fileHash", "type": "string" }], "name": "getComments", "outputs": [ { "components": [ { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "string", "name": "content", "type": "string" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "internalType": "struct Copyright.Comment[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" },
    // getCopyright returns full struct
    { "inputs": [{ "internalType": "string", "name": "_fileHash", "type": "string" }], "name": "getCopyright", "outputs": [ { "components": [ { "internalType": "address", "name": "originalCreator", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "authorName", "type": "string" }, { "internalType": "string", "name": "fileName", "type": "string" }, { "internalType": "string", "name": "fileDescription", "type": "string" }, { "internalType": "string", "name": "fileHash", "type": "string" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "string", "name": "fileUrl", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "bool", "name": "isForSale", "type": "bool" }, { "internalType": "uint256", "name": "royaltyPercent", "type": "uint256" }, { "internalType": "uint256", "name": "likeCount", "type": "uint256" } ], "internalType": "struct Copyright.CopyrightInfo", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "getTotalProducts", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "string", "name": "_fileHash", "type": "string" }], "name": "likeFile", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "string", "name": "_fileHash", "type": "string" }, { "internalType": "uint256", "name": "_price", "type": "uint256" }], "name": "listForSale", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "string", "name": "_authorName", "type": "string" }, { "internalType": "string", "name": "_fileName", "type": "string" }, { "internalType": "string", "name": "_fileDescription", "type": "string" }, { "internalType": "string", "name": "_fileHash", "type": "string" }, { "internalType": "string", "name": "_fileUrl", "type": "string" }, { "internalType": "uint256", "name": "_royaltyPercent", "type": "uint256" }], "name": "register", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
    ];
    const storageServerUrl = 'http://localhost:4000';

    // ============================================================
    // 2. KHAI BÁO BIẾN TOÀN CỤC
    // ============================================================
    let provider, signer, contract, currentAccount, allProductsData = []; 

    // ============================================================
    // 3. KHỞI TẠO (CHẠY KHI WEB LOAD XONG)
    // ============================================================
    document.addEventListener('DOMContentLoaded', async () => {
        // Gan su kien cho cac nut bam
        document.getElementById('connectButton').addEventListener('click', () => signer ? disconnectWallet() : connectWallet());
        document.getElementById('registerButton').addEventListener('click', registerCopyright);
        document.getElementById('checkButton').addEventListener('click', checkCopyright);

        // Xu ly Tab (Da them logic An/Hien Filter)
        document.querySelectorAll('#menuTabs button').forEach(tab => {
            tab.addEventListener('shown.bs.tab', (e) => {
                const targetId = e.target.id;
                const filterBar = document.getElementById('filterBar');
                
                // Doi tieu de
                const titleEl = document.getElementById('content-title');
                if(titleEl) titleEl.innerHTML = e.target.innerHTML;

                // LOGIC AN/HIEN THANH LOC
                if (['tab-my-assets', 'tab-marketplace'].includes(targetId)) {
                    if(filterBar) filterBar.style.display = 'flex'; // Hien thi
                    window.applyFilters();
                } else {
                    if(filterBar) filterBar.style.display = 'none'; // An di
                }
            });
        });

        // Tu dong ket noi vi
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accs) => accs.length ? window.location.reload() : disconnectWallet());
            try { 
                const accs = await window.ethereum.request({ method: 'eth_accounts' });
                if(accs.length) connectWallet();
            } catch(e){}
        }
    });

    // ============================================================
    // 4. KẾT NỐI VÀ TẢI DỮ LIỆU
    // ============================================================

    async function connectWallet() {
        try {
            provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = await provider.getSigner();
            currentAccount = await signer.getAddress();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            
            const btn = document.getElementById('connectButton');
            btn.innerHTML = `<i class="bi bi-wallet-fill"></i> ${currentAccount.substring(0,6)}...`;
            btn.className = 'btn btn-outline-primary';
            
            await fetchAllData();
        } catch(e) { console.error(e); }
    }

    function disconnectWallet() {
        signer = null; contract = null; currentAccount = null; allProductsData = [];
        document.getElementById('connectButton').innerHTML = '<i class="bi bi-wallet2"></i> Kết nối Ví';
        document.getElementById('connectButton').className = 'btn btn-premium';
        document.getElementById('myProductList').innerHTML = "";
        document.getElementById('marketProductList').innerHTML = "";
    }

    async function fetchAllData() {
        if (!contract) return;
        const loadingHTML = '<div class="text-center mt-5"><div class="spinner-border text-primary"></div><div class="mt-2">Đang tải dữ liệu...</div></div>';
        
        if(document.getElementById('myAssetsLoading')) document.getElementById('myAssetsLoading').innerHTML = loadingHTML;
        if(document.getElementById('marketLoading')) document.getElementById('marketLoading').innerHTML = loadingHTML;

        try {
            const total = await contract.getTotalProducts();
            allProductsData = []; 

            for (let i = 0; i < total; i++) {
            const hash = await contract.allFileHashes(i);
            const info = await contract.getCopyright(hash); 
            
            // SỬA: Dùng tên thuộc tính thay vì số index để tránh lỗi lệch dữ liệu
            allProductsData.push({
                originalCreator: info.originalCreator,
                owner: info.owner,
                authorName: info.authorName,
                fileName: info.fileName,
                fileDesc: info.fileDescription, // Lấy đúng tên trong Smart Contract
                fileHash: info.fileHash,
                timestamp: Number(info.timestamp),
                fileUrl: info.fileUrl,
                price: info.price,
                isForSale: info.isForSale,
                royaltyPercent: info.royaltyPercent,
                likeCount: info.likeCount
            });
        }
            
            if(document.getElementById('myAssetsLoading')) document.getElementById('myAssetsLoading').innerHTML = "";
            if(document.getElementById('marketLoading')) document.getElementById('marketLoading').innerHTML = "";
            window.applyFilters(); 

        } catch(e) { console.error(e); }
    }

    window.applyFilters = function() {
        if (!currentAccount) return;
        const keyword = document.getElementById('searchKeyword').value.toLowerCase();
        const type = document.getElementById('filterType').value;
        const sort = document.getElementById('sortOrder').value;

        let filtered = allProductsData.filter(p => {
            const matchName = p.fileName.toLowerCase().includes(keyword) || p.authorName.toLowerCase().includes(keyword);
            const ext = p.fileUrl.split('.').pop().toLowerCase();
            let matchType = true;
            if (type === 'image') matchType = ['jpg','png','jpeg','gif'].includes(ext);
            else if (type === 'video') matchType = ['mp4','webm'].includes(ext);
            else if (type === 'other') matchType = !['jpg','png','jpeg','gif','mp4','webm'].includes(ext);
            return matchName && matchType;
        });

        if (sort === 'newest') filtered.sort((a,b) => b.timestamp - a.timestamp);
        if (sort === 'oldest') filtered.sort((a,b) => a.timestamp - b.timestamp);

        const myHTML = document.getElementById('myProductList');
        const marketHTML = document.getElementById('marketProductList');
        if(myHTML) myHTML.innerHTML = ""; 
        if(marketHTML) marketHTML.innerHTML = "";

        filtered.forEach(p => {
            const isMine = p.owner.toLowerCase() === currentAccount.toLowerCase();
            const priceEth = ethers.formatEther(p.price);
            const preview = createPreviewElement(p.fileUrl);
            
            let btn = '';
            if (isMine) {
                btn = p.isForSale 
                    ? `<button class="btn btn-sm btn-danger w-100" onclick="window.cancelSell('${p.fileHash}')">Hủy Niêm Yết (${priceEth} ETH)</button>`
                    : `<button class="btn btn-sm btn-warning w-100" onclick="window.openSellModal('${p.fileHash}')">Chuyển Nhượng</button>`;
            } else {
                btn = p.isForSale
                    ? `<button class="btn btn-sm btn-success w-100" onclick="window.buyItem('${p.fileHash}', '${p.price}')">✍️ Tiếp Nhận Quyền (${priceEth} ETH)</button>`
                    : `<button class="btn btn-sm btn-secondary w-100" disabled>Đã Sở Hữu / Không Giao Dịch</button>`;
            }

            const likeBtn = `<button class="btn btn-sm btn-outline-danger flex-grow-1" onclick="window.likeFile('${p.fileHash}')"><i class="bi bi-heart-fill"></i> ${p.likeCount}</button>`;
            const detailBtn = `<button class="btn btn-sm btn-outline-info flex-grow-1" onclick="window.openDetail('${p.fileHash}')"><i class="bi bi-info-circle"></i> Chi tiết</button>`;

            const html = `
                <div class="col-md-6 col-lg-4">
                    <div class="product-card h-100 border rounded shadow-sm bg-white p-2">
                        <div class="card-preview-container border-bottom text-center" style="height: 200px; overflow: hidden; display:flex; align-items:center; justify-content:center; background:#f8f9fa;">${preview}</div>
                        <div class="card-body mt-2">
                            <h5 class="text-truncate fw-bold" title="${p.fileName}">${p.fileName}</h5>
                            <p class="small text-muted mb-1"><i class="bi bi-person"></i> ${p.authorName}</p>
                            <div class="mt-2 mb-2">${btn}</div>
                            <div class="d-flex gap-2">${likeBtn} ${detailBtn}</div>
                        </div>
                    </div>
                </div>`;

            if (isMine && myHTML) myHTML.innerHTML += html;
            else if (p.isForSale && marketHTML) marketHTML.innerHTML += html;
        });
    }

// === HÀM CHI TIẾT (PHIÊN BẢN FIX: TẢI TRỰC TIẾP, KHÔNG DÙNG BỘ NHỚ ĐỆM) ===
window.openDetail = async (hash) => {
    console.log("Đang mở chi tiết cho:", hash);
    
    // 1. Mở Modal ngay lập tức (để thấy phản hồi)
    const el = document.getElementById('detailModal');
    const myModal = bootstrap.Modal.getOrCreateInstance(el);
    myModal.show();

    // 2. Reset giao diện về trạng thái "Đang tải..."
    document.getElementById('detailTitle').innerText = "Đang tải...";
    document.getElementById('detailDesc').innerText = "Đang lấy dữ liệu từ Blockchain...";
    document.getElementById('detailPreview').innerHTML = '<div class="d-flex justify-content-center p-4"><div class="spinner-border text-primary"></div></div>';
    document.getElementById('historyList').innerHTML = "";
    document.getElementById('commentsList').innerHTML = "";

    try {
        // 3. Lấy dữ liệu MỚI NHẤT trực tiếp từ Contract (Bỏ qua allProductsData)
        // Hàm này trả về một mảng chứa 12 giá trị
        const info = await contract.getCopyright(hash);
        
        // 4. Điền dữ liệu vào HTML (Dùng số thứ tự mảng cho chắc chắn)
        // Thứ tự: [0:creator, 1:owner, 2:author, 3:name, 4:desc, 5:hash, 6:time, 7:url, 8:price, 9:sale, 10:royalty, 11:likes]
        
        document.getElementById('detailTitle').innerText = info[3];          // Tên file
        document.getElementById('detailPreview').innerHTML = createPreviewElement(info[7]); // URL
        document.getElementById('detailAuthor').innerText = info[2];         // Tác giả
        document.getElementById('detailOwner').innerHTML = formatAddress(info[1]); // Chủ sở hữu
        document.getElementById('detailRoyalty').innerText = info[10] + "%"; // Hoa hồng
        document.getElementById('detailLikes').innerText = info[11];         // Like
        document.getElementById('detailDesc').innerText = info[4];           // Mô tả
        document.getElementById('detailHash').innerText = info[5];           // Hash

        // 5. Tải Bình luận & Lịch sử
        window.loadComments(hash);
        window.loadHistory(hash);

    } catch (e) {
        console.error("Lỗi tải chi tiết:", e);
        document.getElementById('detailTitle').innerText = "Lỗi tải dữ liệu!";
        document.getElementById('detailDesc').innerText = "Không thể lấy thông tin từ Blockchain. Vui lòng kiểm tra lại kết nối.";
    }
}

// === HÀM PHỤ: TẢI LỊCH SỬ (TÁCH RIÊNG RA CHO GỌN) ===
window.loadHistory = async (hash) => {
    const hList = document.getElementById('historyList');
    hList.innerHTML = "<li class='list-group-item text-muted small'>⏳ Đang tra cứu lịch sử...</li>";
    
    try {
        const logsRegAll = await contract.queryFilter(contract.filters.CopyrightRegistered());
        const logsSoldAll = await contract.queryFilter(contract.filters.CopyrightSold());
        
        const logsReg = logsRegAll.filter(l => l.args[1] === hash);
        const logsSold = logsSoldAll.filter(l => l.args[3] === hash);

        let evs = [];
        logsReg.forEach(l => evs.push({t:'Reg', b:l.blockNumber, u:l.args[0]}));
        logsSold.forEach(l => evs.push({t:'Sold', b:l.blockNumber, f:l.args[0], to:l.args[1], p:ethers.formatEther(l.args[2])}));
        
        evs.sort((a,b) => a.b - b.b);
        
        hList.innerHTML = "";
        if (evs.length === 0) hList.innerHTML = "<li class='list-group-item small'>Chưa có lịch sử.</li>";

        evs.forEach(e => {
            let content = "";
            if (e.t === 'Reg') {
                content = `<span class="badge bg-primary">Khởi tạo</span> bởi ${formatAddress(e.u)}`;
            } else {
                content = `<span class="badge bg-success">Chuyển nhượng</span> từ ${formatAddress(e.f)} sang ${formatAddress(e.to)} <br>(Giá: <b>${e.p} ETH</b>)`;
            }
            hList.innerHTML += `<li class="list-group-item small">${content}</li>`;
        });
    } catch (e) {
        console.error(e);
        hList.innerHTML = "<li class='list-group-item text-danger small'>Lỗi tải lịch sử.</li>"; 
    }
}   

    window.postComment = async () => {
        const hash = document.getElementById('detailHash').textContent;
        const content = document.getElementById('commentInput').value;
        if(!content) return;
        try {
            const tx = await contract.addComment(hash, content);
            await tx.wait();
            document.getElementById('commentInput').value = "";
            window.loadComments(hash);
        } catch(e) { alert(e.message); }
    }

    window.loadComments = async (hash) => {
        const list = document.getElementById('commentsList');
        list.innerHTML = "Đang tải...";
        try {
            const comments = await contract.getComments(hash);
            list.innerHTML = "";
            if(comments.length == 0) list.innerHTML = "<small class='text-muted'>Chưa có bình luận.</small>";
            comments.forEach(c => {
                list.innerHTML += `<div class="border-bottom py-2"><strong class="small">${formatAddress(c.user)}</strong>: <span class="small">${c.content}</span></div>`;
            });
        } catch(e) { list.innerText = "Lỗi."; }
    }

    window.openSellModal = (hash) => {
        const el = document.getElementById('sellModal');
        const myModal = new bootstrap.Modal(el);
        document.getElementById('sellHashInput').value = hash;
        document.getElementById('sellPriceInput').value = "";
        myModal.show();
    }

    window.confirmSell = async () => {
        const hash = document.getElementById('sellHashInput').value;
        const price = document.getElementById('sellPriceInput').value;
        if(!price) return;
        try {
            const tx = await contract.listForSale(hash, ethers.parseEther(price));
            await tx.wait();
            const el = document.getElementById('sellModal');
            const modal = bootstrap.Modal.getInstance(el); // Lay instance da co
            if(modal) modal.hide();
            window.location.reload();
        } catch(e) { alert(e.message); }
    }

    window.cancelSell = async (hash) => {
        if(!confirm("Hủy niêm yết chuyển nhượng?")) return;
        try {
            const tx = await contract.cancelListing(hash);
            await tx.wait();
            window.location.reload();
        } catch(e) { alert(e.message); }
    }

    window.buyItem = async (hash, price) => {
        try {
            const tx = await contract.buyCopyright(hash, { value: price });
            await tx.wait();
            window.location.reload();
        } catch(e) { alert(e.message); }
    }

    window.likeFile = async (hash) => {
        try { await (await contract.likeFile(hash)).wait(); fetchAllData(); } 
        catch(e) { alert("Lỗi: " + (e.reason || e.message)); }
    }

    window.downloadCertificate = () => {
        if(!window.jspdf) return alert("Chưa tải xong thư viện.");
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("CERTIFICATE OF OWNERSHIP", 105, 20, null, null, "center");
        doc.text(document.getElementById('detailTitle').textContent, 105, 40, null, null, "center");
        doc.text("Author: " + document.getElementById('detailAuthor').textContent, 10, 60);
        doc.text("Owner: " + document.getElementById('detailOwner').textContent, 10, 80);
        doc.text("Hash: " + document.getElementById('detailHash').textContent, 10, 100);
        doc.save("certificate.pdf");
    }

    async function registerCopyright() {
        if (!signer) return alert("Kết nối ví!");
        const name = document.getElementById('regFileName').value;
        const author = document.getElementById('regAuthorName').value;
        const royalty = document.getElementById('regRoyalty').value;
        const desc = document.getElementById('regFileDesc').value;
        const file = document.getElementById('regFileInput').files[0];
        if(!name || !file) return alert("Thiếu thông tin");

        const btn = document.getElementById('registerButton');
        btn.disabled = true; btn.innerText = "Đang xử lý...";

        try {
            const hash = await calculateFileHash(file);
            const fd = new FormData(); fd.append('productFile', file);
            const res = await fetch(`${storageServerUrl}/upload`, { method:'POST', body:fd });
            const url = (await res.json()).fileUrl;

            const tx = await contract.register(author, name, desc, hash, url, royalty);
            await tx.wait();
            alert("Niêm yết chuyển nhượng thành công!");
            window.location.reload();
        } catch (e) { alert("Lỗi: " + (e.reason||e.message)); }
        finally { btn.disabled = false; btn.innerText = "Đăng Ký Ngay"; }
    }

    function calculateFileHash(f){ return new Promise((res,rej)=>{const r=new FileReader();r.onload=async(e)=>res('0x'+Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',e.target.result))).map(b=>b.toString(16).padStart(2,'0')).join(''));r.readAsArrayBuffer(f);});}
    function createPreviewElement(u){ const e=u.split('.').pop().toLowerCase(); return ['jpg','png','jpeg'].includes(e)?`<img src="${u}" class="img-fluid rounded" style="max-height:200px">`:`<a href="${u}" target="_blank">Tải file</a>`; }
    async function checkCopyright() {
    if (!contract) return alert("Kết nối ví trước!");
    const file = document.getElementById('checkFileInput').files[0];
    if (!file) return alert("Chọn file!");
    document.getElementById('checkStatus').innerHTML = "Đang kiểm tra...";
    try {
        const hash = await calculateFileHash(file);
        const info = await contract.getCopyright(hash);
        if (info[0] === '0x0000000000000000000000000000000000000000') document.getElementById('checkStatus').innerHTML = `<div class="alert alert-warning">Chưa đăng ký.</div>`;
        else document.getElementById('checkStatus').innerHTML = `<div class="alert alert-success">Đã đăng ký.<br>Tên file: ${info[3]}<br>Chủ sở hữu: ${info[1]}</div>`;
    } catch (e) { document.getElementById('checkStatus').innerHTML = "Lỗi: " + e.message; }
    }

    // === HAM HELPER: RUT GON DIA CHI + HIEN TOOLTIP ===
    function formatAddress(addr) {
        if (!addr) return "Unknown";
        // Tra ve HTML: Hien thi rut gon, nhung co thuoc tinh 'title' chua full dia chi
        return `<span title="${addr}" class="text-primary" style="cursor: help; text-decoration: underline dotted;">
                    ${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}
                </span>`;
    }

// ============================================================
// 5. CÁC HÀM XỬ LÝ NÚT BẤM (BỔ SUNG VÀO CUỐI FILE)
// ============================================================

// --- MỞ CHI TIẾT (FIX LỖI KHÔNG HIỆN DỮ LIỆU) ---
window.openDetail = async (hash) => {
    // 1. Mở Modal ngay lập tức
    const el = document.getElementById('detailModal');
    const myModal = bootstrap.Modal.getOrCreateInstance(el);
    myModal.show();

    // Reset dữ liệu cũ
    if(document.getElementById('detailDesc')) document.getElementById('detailDesc').innerText = "Đang tải...";
    
    try {
        // 2. Lấy dữ liệu TRỰC TIẾP từ Blockchain (để đảm bảo có dữ liệu)
        const info = await contract.getCopyright(hash);
        
        // info trả về: [creator, owner, authorName, fileName, desc, hash, time, url, price, isSale, royalty, likes]

        // 3. Điền dữ liệu vào HTML (Có kiểm tra ID tồn tại không để tránh lỗi)
        if(document.getElementById('detailTitle')) document.getElementById('detailTitle').innerText = info[3]; // Tên file
        if(document.getElementById('detailPreview')) document.getElementById('detailPreview').innerHTML = createPreviewElement(info[7]);
        
        if(document.getElementById('detailAuthor')) document.getElementById('detailAuthor').innerText = info[2]; // Tác giả
        if(document.getElementById('detailOwner')) document.getElementById('detailOwner').innerHTML = formatAddress(info[1]); // Chủ sở hữu
        
        if(document.getElementById('detailRoyalty')) document.getElementById('detailRoyalty').innerText = info[10] + "%";
        if(document.getElementById('detailLikes')) document.getElementById('detailLikes').innerText = info[11];
        
        if(document.getElementById('detailDesc')) document.getElementById('detailDesc').innerText = info[4]; // Mô tả
        if(document.getElementById('detailHash')) document.getElementById('detailHash').innerText = info[5]; // Hash

        // 4. Tải các phần phụ
        window.loadComments(hash);
        window.loadHistory(hash);

    } catch (e) {
        console.error("Lỗi tải chi tiết:", e);
        if(document.getElementById('detailDesc')) document.getElementById('detailDesc').innerText = "Lỗi: Không thể tải dữ liệu từ Blockchain.";
    }
}

// --- TẢI LỊCH SỬ ---
window.loadHistory = async (hash) => {
    const hList = document.getElementById('historyList');
    if(!hList) return;
    hList.innerHTML = "<li class='list-group-item text-muted small'>⏳ Đang tra cứu...</li>";
    
    try {
        const logsReg = await contract.queryFilter(contract.filters.CopyrightRegistered());
        const logsSold = await contract.queryFilter(contract.filters.CopyrightSold());
        
        // Lọc thủ công các sự kiện liên quan đến hash này
        const myReg = logsReg.filter(l => l.args[1] === hash);
        const mySold = logsSold.filter(l => l.args[3] === hash);

        let evs = [];
        myReg.forEach(l => evs.push({t:'Reg', b:l.blockNumber, u:l.args[0]}));
        mySold.forEach(l => evs.push({t:'Sold', b:l.blockNumber, f:l.args[0], to:l.args[1], p:ethers.formatEther(l.args[2])}));
        
        evs.sort((a,b) => a.b - b.b); // Sắp xếp theo thời gian
        
        hList.innerHTML = "";
        if (evs.length === 0) hList.innerHTML = "<li class='list-group-item small'>Chưa có lịch sử.</li>";

        evs.forEach(e => {
            let content = "";
            if (e.t === 'Reg') content = `<span class="badge bg-primary">Khởi tạo</span> bởi ${formatAddress(e.u)}`;
            else content = `<span class="badge bg-success">Chuyển nhượng</span> từ ${formatAddress(e.f)} sang ${formatAddress(e.to)} giá <b>${e.p} ETH</b>`;
            hList.innerHTML += `<li class="list-group-item small">${content}</li>`;
        });
    } catch (e) {
        console.error(e);
        hList.innerHTML = "<li class='list-group-item text-danger small'>Lỗi tải lịch sử.</li>"; 
    }
}

// --- BÌNH LUẬN ---
window.postComment = async () => {
    const hashEl = document.getElementById('detailHash');
    if(!hashEl) return;
    const hash = hashEl.innerText;
    const content = document.getElementById('commentInput').value;
    if(!content) return;
    
    try {
        const tx = await contract.addComment(hash, content);
        await tx.wait();
        document.getElementById('commentInput').value = "";
        window.loadComments(hash);
    } catch(e) { alert("Lỗi gửi bình luận: " + e.message); }
}

window.loadComments = async (hash) => {
    const list = document.getElementById('commentsList');
    if(!list) return;
    list.innerHTML = "Đang tải...";
    try {
        const comments = await contract.getComments(hash);
        list.innerHTML = "";
        if(comments.length == 0) list.innerHTML = "<small class='text-muted p-2'>Chưa có ghi chú nào.</small>";
        comments.forEach(c => {
            list.innerHTML += `<div class="border-bottom py-2 px-2"><strong class="small text-primary">${formatAddress(c.user)}</strong>: <span class="small">${c.content}</span></div>`;
        });
    } catch(e) { list.innerText = "Lỗi tải bình luận."; }
}

// --- CÁC HÀM MUA BÁN ---
window.openSellModal = (hash) => {
    document.getElementById('sellHashInput').value = hash;
    document.getElementById('sellPriceInput').value = "";
    const el = document.getElementById('sellModal');
    const myModal = bootstrap.Modal.getOrCreateInstance(el);
    myModal.show();
}

window.confirmSell = async () => {
    const hash = document.getElementById('sellHashInput').value;
    const price = document.getElementById('sellPriceInput').value;
    if(!price) return;
    try {
        const tx = await contract.listForSale(hash, ethers.parseEther(price));
        await tx.wait();
        const el = document.getElementById('sellModal');
        bootstrap.Modal.getInstance(el).hide();
        window.location.reload();
    } catch(e) { alert(e.message); }
}

window.cancelSell = async (hash) => {
    if(!confirm("Hủy niêm yết?")) return;
    try {
        const tx = await contract.cancelListing(hash);
        await tx.wait();
        window.location.reload();
    } catch(e) { alert(e.message); }
}

window.buyItem = async (hash, price) => {
    if(!confirm("Xác nhận tiếp nhận quyền?")) return;
    try {
        const tx = await contract.buyCopyright(hash, { value: price });
        await tx.wait();
        alert("Chuyển nhượng thành công!");
        window.location.reload();
    } catch(e) { alert(e.message); }
}

window.likeFile = async (hash) => {
    try { await (await contract.likeFile(hash)).wait(); fetchAllData(); } 
    catch(e) { alert("Lỗi: " + (e.reason || e.message)); }
}

window.downloadCertificate = () => {
    if(!window.jspdf) return alert("Chưa tải thư viện PDF");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("CHUNG NHAN BAN QUYEN SO", 105, 30, null, null, "center");
    doc.text("Tac pham: " + (document.getElementById('detailTitle')?.innerText || ""), 105, 50, null, null, "center");
    doc.text("So huu boi: " + (document.getElementById('detailOwner')?.innerText || ""), 10, 70);
    doc.text("Ma Hash: " + (document.getElementById('detailHash')?.innerText || ""), 10, 90);
    doc.save("Certificate.pdf");
}

// --- HÀM HIỂN THỊ FILE (VIDEO/ẢNH/AUDIO) - KHÔNG NÚT TẢI ---
function createPreviewElement(fileUrl) {
    if (!fileUrl) return '<span class="text-muted">Không có dữ liệu</span>';
    
    const ext = fileUrl.split('.').pop().toLowerCase();
    let mediaHtml = '';

    // 1. Kiểm tra loại file để hiển thị
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext)) {
        // ẢNH
        mediaHtml = `<img src="${fileUrl}" class="img-fluid rounded shadow-sm" style="max-height: 300px; width: 100%; object-fit: contain;">`;
    } 
    else if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) {
        // VIDEO (Phát trực tiếp)
        mediaHtml = `
            <div class="ratio ratio-16x9">
                <video controls class="rounded shadow-sm" style="background: black;">
                    <source src="${fileUrl}">
                    Trình duyệt không hỗ trợ video này.
                </video>
            </div>`;
    }
    else if (['mp3', 'wav'].includes(ext)) {
        // ÂM THANH
        mediaHtml = `<audio controls class="w-100 mt-2"><source src="${fileUrl}"></audio>`;
    }
    else {
        // FILE KHÁC (Chỉ hiện icon thông báo)
        mediaHtml = `
            <div class="p-4 bg-light border rounded text-center">
                <i class="bi bi-file-earmark-binary fs-1 text-secondary"></i>
                <p class="mt-2 mb-0 text-muted">Định dạng file: .${ext}</p>
            </div>`;
    }

    return mediaHtml;
}