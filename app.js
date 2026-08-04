
        // ===== PARALLAX HERO (qısa) =====
        (function initParticleHero() {
            const container = document.getElementById('particle-hero');
            if (!container) return;
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 9;
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);
            const count = 30000;
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            const cTeal = new THREE.Color('#00827c');
            const cTealBright = new THREE.Color('#00d4c0');
            const cWhite = new THREE.Color('#ffffff');
            const cPink = new THREE.Color('#fde9ff');
            const radius = 4.5;
            for (let i = 0; i < count; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const r = radius * Math.pow(Math.random(), 0.45);
                positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                positions[i * 3 + 2] = r * Math.cos(phi);
                const mix = Math.random();
                if (mix < 0.45) { colors[i * 3] = cTeal.r;
                    colors[i * 3 + 1] = cTeal.g;
                    colors[i * 3 + 2] = cTeal.b; } else if (mix < 0.70) { colors[i * 3] = cTealBright.r;
                    colors[i * 3 + 1] = cTealBright.g;
                    colors[i * 3 + 2] = cTealBright.b; } else if (mix < 0.90) { colors[i * 3] = cWhite.r;
                    colors[i * 3 + 1] = cWhite.g;
                    colors[i * 3 + 2] = cWhite.b; } else { colors[i * 3] = cPink.r;
                    colors[i * 3 + 1] = cPink.g;
                    colors[i * 3 + 2] = cPink.b; }
            }
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            const material = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.92,
                blending: THREE.AdditiveBlending, sizeAttenuation: true });
            const particles = new THREE.Points(geometry, material);
            scene.add(particles);
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, 256, 256);
            const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
            grad.addColorStop(0, 'rgba(253, 233, 255, 0.12)');
            grad.addColorStop(1, 'rgba(0, 130, 124, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 256, 256);
            ctx.font = '80px "Font Awesome 6 Free"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(253, 233, 255, 0.5)';
            ctx.shadowBlur = 50;
            ctx.fillStyle = '#fde9ff';
            ctx.fillText('\uf1b9', 128, 130);
            ctx.shadowBlur = 0;
            const grad2 = ctx.createLinearGradient(50, 50, 206, 206);
            grad2.addColorStop(0, '#00827c');
            grad2.addColorStop(0.5, '#cbfffc');
            grad2.addColorStop(1, '#fde9ff');
            ctx.fillStyle = grad2;
            ctx.fillText('\uf1b9', 128, 128);
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, blending: THREE
                    .AdditiveBlending, opacity: 0.8, depthWrite: false });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.scale.set(1.8, 1.8, 1);
            scene.add(sprite);
            let mouseX = 0,
                mouseY = 0,
                targetX = 0,
                targetY = 0;
            document.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            });
            document.addEventListener('touchmove', (e) => {
                const t = e.touches[0];
                if (t) { mouseX = (t.clientX / window.innerWidth - 0.5) * 2;
                    mouseY = (t.clientY / window.innerHeight - 0.5) * 2; }
            }, { passive: true });
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            let time = 0;

            function animate() {
                requestAnimationFrame(animate);
                time += 0.003;
                targetX += (mouseY * 0.4 - targetX) * 0.04;
                targetY += (mouseX * 0.4 - targetY) * 0.04;
                particles.rotation.x += (targetX - particles.rotation.x) * 0.05;
                particles.rotation.y += (targetY - particles.rotation.y) * 0.05;
                particles.rotation.z += Math.sin(time * 0.2) * 0.0005;
                sprite.rotation.z = particles.rotation.z * 0.5;
                const pulse = 1 + Math.sin(time * 0.6) * 0.015;
                particles.scale.set(pulse, pulse, pulse);
                renderer.render(scene, camera);
            }
            animate();
            window.addEventListener('beforeunload', () => {
                renderer.dispose();
                geometry.dispose();
                material.dispose();
                spriteMat.dispose();
            });
        })();


        // ===== STATE & HELPERS =====
        const state = {
            user: { username: 'admin', role: 'admin', name: 'Admin' },
            role: 'admin',
            token: 'auto-login-' + Date.now(),
            products: [],
            suppliers: [],
            purchases: [],
            sales: [],
            finance: [],
            employees: [],
            taxes: [],
            debts: [],
            customers: [],
            posCart: [],
            productPage: 1,
            productPageSize: 15,
        };

        function $(id) { return document.getElementById(id); }

        function fmt(n) { return Number(n).toFixed(2); }

        function fmtMoney(n) { return fmt(n) + ' ₼'; }

        function today() { return new Date().toISOString().split('T')[0]; }

        function now() { return new Date().toLocaleString('az-AZ'); }

        function randId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

        function toast(msg, type = 'success') {
            const c = document.getElementById('toastContainer');
            const el = document.createElement('div');
            el.className = `toast toast-${type}`;
            el.textContent = msg;
            c.appendChild(el);
            setTimeout(() => { el.style.opacity = '0';
                setTimeout(() => el.remove(), 300); }, 2800);
        }

        function closeModal(id) { document.getElementById(id).classList.remove('active'); }

        function openModal(id) { document.getElementById(id).classList.add('active'); }

        function loadFromStorage(key) {
            try { return JSON.parse(localStorage.getItem('autoparts_' + key)) || []; } catch { return []; }
        }

        function saveToStorage(key, data) {
            localStorage.setItem('autoparts_' + key, JSON.stringify(data));
            if (window.fbWrite) window.fbWrite(key, data);
        }

        function getProducts() { return state.products; }

        function setProducts(p) { state.products = p;
            saveToStorage('products', p); }

        function getSuppliers() { return state.suppliers; }

        function setSuppliers(s) { state.suppliers = s;
            saveToStorage('suppliers', s); }

        function getPurchases() { return state.purchases; }

        function setPurchases(p) { state.purchases = p;
            saveToStorage('purchases', p); }

        function getSales() { return state.sales; }

        function setSales(s) { state.sales = s;
            saveToStorage('sales', s); }

        function getFinance() { return state.finance; }

        function setFinance(f) { state.finance = f;
            saveToStorage('finance', f); }

        function getEmployees() { return state.employees; }

        function setEmployees(e) { state.employees = e;
            saveToStorage('employees', e); }

        function getTaxes() { return state.taxes; }

        function setTaxes(t) { state.taxes = t;
            saveToStorage('taxes', t); }

        function getDebts() { return state.debts; }

        function setDebts(d) { state.debts = d;
            saveToStorage('debts', d); }

        function getCustomers() { return state.customers; }

        function setCustomers(c) { state.customers = c;
            saveToStorage('customers', c); }


        // ===== FIREBASE -> UI SİNXRONİZASİYASI =====
        // Bulud tərəfdən (Firebase) yeni məlumat gələndə lokal state-i yeniləyir
        // və yalnız aidiyyəti səhifəni yenidən çəkir. localStorage-ı da təzələyir
        // ki, offline vəziyyətdə də ən son bulud versiyası keş kimi qalsın.
        function applyFirebaseData(key, data) {
            if (data === null || data === undefined) return; // hələ bulud boşdur, yerli demo datanı saxla
            const arr = Array.isArray(data) ? data : Object.values(data);
            localStorage.setItem('autoparts_' + key, JSON.stringify(arr));
            switch (key) {
                case 'products':
                    state.products = arr;
                    if (document.getElementById('page-products')) renderProducts();
                    if (document.getElementById('page-sales')) renderPosProducts();
                    if (document.getElementById('page-dashboard')) renderDashboard();
                    break;
                case 'suppliers':
                    state.suppliers = arr;
                    if (document.getElementById('page-suppliers')) renderSuppliers();
                    break;
                case 'purchases':
                    state.purchases = arr;
                    if (document.getElementById('page-purchases')) renderPurchases();
                    break;
                case 'sales':
                    state.sales = arr;
                    if (document.getElementById('page-dashboard')) renderDashboard();
                    break;
                case 'finance':
                    state.finance = arr;
                    if (document.getElementById('page-finance')) renderFinance();
                    if (document.getElementById('page-dashboard')) renderDashboard();
                    break;
                case 'employees':
                    state.employees = arr;
                    if (document.getElementById('page-employees')) renderEmployees();
                    break;
                case 'taxes':
                    state.taxes = arr;
                    if (document.getElementById('page-taxes')) renderTaxes();
                    break;
                case 'debts':
                    state.debts = arr;
                    if (document.getElementById('page-debts')) renderDebts();
                    break;
                case 'customers':
                    state.customers = arr;
                    if (document.getElementById('page-customers')) renderCustomers();
                    break;
            }
        }
        window.applyFirebaseData = applyFirebaseData;


        // ===== VIN KATALOQU (genişləndirilmiş) =====
        function yrs(from, to) { const a = []; for (let y = from; y <= to; y++) a.push(y); return a; }
        const VinDatabase = {
            wmiMap: {
                '1HG': { make: 'Honda' },
                '2HG': { make: 'Honda' },
                '3HG': { make: 'Honda' },
                'JHM': { make: 'Honda' },
                '1F': { make: 'Ford' },
                '2F': { make: 'Ford' },
                '3F': { make: 'Ford' },
                '1G': { make: 'Chevrolet' },
                '2G': { make: 'Chevrolet' },
                '3G': { make: 'Chevrolet' },
                '1N': { make: 'Nissan' },
                '2N': { make: 'Nissan' },
                'JN': { make: 'Nissan' },
                '1T': { make: 'Toyota' },
                '2T': { make: 'Toyota' },
                'JT': { make: 'Toyota' },
                'WVG': { make: 'Volkswagen' },
                'WVW': { make: 'Volkswagen' },
                'WBA': { make: 'BMW' },
                'WBS': { make: 'BMW' },
                'WDB': { make: 'Mercedes-Benz' },
                'WDC': { make: 'Mercedes-Benz' },
                'WDD': { make: 'Mercedes-Benz' },
                'SAJ': { make: 'Jaguar' },
                'SAL': { make: 'Land Rover' },
                'YV1': { make: 'Volvo' },
                'YV4': { make: 'Volvo' },
                'VF1': { make: 'Renault' },
                'VF3': { make: 'Peugeot' },
                'VF7': { make: 'Citroën' },
                'ZFA': { make: 'Fiat' },
                'ZFF': { make: 'Ferrari' },
                'ZAM': { make: 'Maserati' },
                'WAU': { make: 'Audi' },
                'WUA': { make: 'Audi' },
                'KMH': { make: 'Hyundai' },
                'KNA': { make: 'Kia' },
                'JM1': { make: 'Mazda' },
                'JF1': { make: 'Subaru' },
                'JTJ': { make: 'Lexus' },
                'WP0': { make: 'Porsche' },
                '5YJ': { make: 'Tesla' },
                'TMB': { make: 'Skoda' },
                'VSS': { make: 'Seat' },
                'W0L': { make: 'Opel' },
                'WMW': { make: 'MINI' },
                'ZAR': { make: 'Alfa Romeo' },
                'UU1': { make: 'Dacia' },
                'JN1': { make: 'Infiniti' },
                '19U': { make: 'Acura' },
                '1C3': { make: 'Chrysler' },
                '1B3': { make: 'Dodge' },
                '1J4': { make: 'Jeep' },
                '1G6': { make: 'Cadillac' },
                '1GT': { make: 'GMC' },
                '1G4': { make: 'Buick' },
                '1LN': { make: 'Lincoln' },
                'SCB': { make: 'Bentley' },
                'SCA': { make: 'Rolls-Royce' },
                'SCF': { make: 'Aston Martin' },
                'WME': { make: 'Smart' },
                'JA3': { make: 'Mitsubishi' },
                'JS1': { make: 'Suzuki' },
                'XTA': { make: 'Lada' },
                'XTT': { make: 'UAZ' },
            },
            models: {
                'Honda': {
                    'Accord': { years: yrs(2008, 2024) },
                    'Civic': { years: yrs(2006, 2024) },
                    'CR-V': { years: yrs(2007, 2024) },
                    'Pilot': { years: yrs(2009, 2024) },
                },
                'Toyota': {
                    'Camry': { years: yrs(2007, 2024) },
                    'Corolla': { years: yrs(2008, 2024) },
                    'RAV4': { years: yrs(2006, 2024) },
                    'Land Cruiser': { years: yrs(2008, 2024) },
                    'Prado': { years: yrs(2009, 2024) },
                },
                'BMW': {
                    '3 Series': { years: yrs(2005, 2024) },
                    '5 Series': { years: yrs(2005, 2024) },
                    'X5': { years: yrs(2007, 2024) },
                    'X3': { years: yrs(2006, 2024) },
                },
                'Mercedes-Benz': {
                    'C-Class': { years: yrs(2007, 2024) },
                    'E-Class': { years: yrs(2006, 2024) },
                    'S-Class': { years: yrs(2006, 2024) },
                    'GLE': { years: yrs(2015, 2024) },
                },
                'Ford': {
                    'Focus': { years: yrs(2005, 2024) },
                    'Fiesta': { years: yrs(2008, 2024) },
                    'Explorer': { years: yrs(2006, 2024) },
                    'Kuga': { years: yrs(2008, 2024) },
                },
                'Chevrolet': {
                    'Malibu': { years: yrs(2008, 2024) },
                    'Cruze': { years: yrs(2009, 2024) },
                    'Tahoe': { years: yrs(2007, 2024) },
                    'Lacetti': { years: yrs(2004, 2013) },
                },
                'Nissan': {
                    'Altima': { years: yrs(2007, 2024) },
                    'Rogue': { years: yrs(2008, 2024) },
                    'Qashqai': { years: yrs(2007, 2024) },
                    'Patrol': { years: yrs(2006, 2024) },
                },
                'Volkswagen': {
                    'Golf': { years: yrs(2006, 2024) },
                    'Passat': { years: yrs(2005, 2024) },
                    'Tiguan': { years: yrs(2008, 2024) },
                    'Polo': { years: yrs(2009, 2024) },
                },
                'Audi': {
                    'A4': { years: yrs(2005, 2024) },
                    'A6': { years: yrs(2005, 2024) },
                    'Q5': { years: yrs(2009, 2024) },
                    'Q7': { years: yrs(2006, 2024) },
                },
                'Hyundai': {
                    'Elantra': { years: yrs(2006, 2024) },
                    'Sonata': { years: yrs(2006, 2024) },
                    'Tucson': { years: yrs(2005, 2024) },
                    'Santa Fe': { years: yrs(2007, 2024) },
                },
                'Kia': {
                    'Optima': { years: yrs(2006, 2024) },
                    'Sportage': { years: yrs(2005, 2024) },
                    'Rio': { years: yrs(2006, 2024) },
                    'Sorento': { years: yrs(2009, 2024) },
                },
                'Mazda': {
                    'Mazda3': { years: yrs(2006, 2024) },
                    'Mazda6': { years: yrs(2006, 2024) },
                    'CX-5': { years: yrs(2013, 2024) },
                },
                'Subaru': {
                    'Impreza': { years: yrs(2005, 2024) },
                    'Outback': { years: yrs(2005, 2024) },
                    'Forester': { years: yrs(2008, 2024) },
                },
                'Lexus': {
                    'ES': { years: yrs(2006, 2024) },
                    'RX': { years: yrs(2006, 2024) },
                    'GX': { years: yrs(2010, 2024) },
                    'LX': { years: yrs(2008, 2024) },
                },
                'Volvo': {
                    'S60': { years: yrs(2005, 2024) },
                    'XC60': { years: yrs(2008, 2024) },
                    'XC90': { years: yrs(2005, 2024) },
                },
                'Renault': {
                    'Clio': { years: yrs(2005, 2024) },
                    'Megane': { years: yrs(2005, 2024) },
                    'Duster': { years: yrs(2010, 2024) },
                    'Logan': { years: yrs(2005, 2024) },
                },
                'Peugeot': {
                    '208': { years: yrs(2012, 2024) },
                    '308': { years: yrs(2007, 2024) },
                    '3008': { years: yrs(2009, 2024) },
                    '508': { years: yrs(2010, 2024) },
                },
                'Fiat': {
                    '500': { years: yrs(2007, 2024) },
                    'Doblo': { years: yrs(2010, 2024) },
                    'Tipo': { years: yrs(2015, 2024) },
                },
                'Jaguar': {
                    'XF': { years: yrs(2007, 2024) },
                    'F-Pace': { years: yrs(2016, 2024) },
                },
                'Land Rover': {
                    'Discovery': { years: yrs(2005, 2017) },
                    'Range Rover': { years: yrs(2005, 2024) },
                    'Range Rover Sport': { years: yrs(2005, 2024) },
                },
                'Porsche': {
                    '911': { years: yrs(2005, 2024) },
                    'Cayenne': { years: yrs(2005, 2024) },
                    'Macan': { years: yrs(2014, 2024) },
                },
                'Tesla': {
                    'Model 3': { years: yrs(2017, 2024) },
                    'Model S': { years: yrs(2012, 2024) },
                    'Model Y': { years: yrs(2020, 2024) },
                },
                'Citroën': {
                    'C4': { years: yrs(2005, 2024) },
                    'Berlingo': { years: yrs(2005, 2024) },
                    'C5': { years: yrs(2005, 2017) },
                },
                'Ferrari': {
                    '488': { years: yrs(2015, 2024) },
                    'Portofino': { years: yrs(2018, 2024) },
                    'Roma': { years: yrs(2020, 2024) },
                },
                'Maserati': {
                    'Ghibli': { years: yrs(2013, 2024) },
                    'Levante': { years: yrs(2016, 2024) },
                },
                'Skoda': {
                    'Octavia': { years: yrs(2005, 2024) },
                    'Superb': { years: yrs(2008, 2024) },
                    'Fabia': { years: yrs(2007, 2024) },
                    'Kodiaq': { years: yrs(2017, 2024) },
                },
                'Seat': {
                    'Leon': { years: yrs(2005, 2024) },
                    'Ibiza': { years: yrs(2008, 2024) },
                },
                'Opel': {
                    'Astra': { years: yrs(2005, 2024) },
                    'Corsa': { years: yrs(2006, 2024) },
                    'Insignia': { years: yrs(2009, 2024) },
                },
                'MINI': {
                    'Cooper': { years: yrs(2007, 2024) },
                    'Countryman': { years: yrs(2010, 2024) },
                },
                'Alfa Romeo': {
                    'Giulia': { years: yrs(2016, 2024) },
                    'Stelvio': { years: yrs(2017, 2024) },
                },
                'Dacia': {
                    'Duster': { years: yrs(2010, 2024) },
                    'Logan': { years: yrs(2005, 2024) },
                    'Sandero': { years: yrs(2008, 2024) },
                },
                'Infiniti': {
                    'Q50': { years: yrs(2013, 2024) },
                    'QX60': { years: yrs(2013, 2024) },
                },
                'Acura': {
                    'TLX': { years: yrs(2014, 2024) },
                    'MDX': { years: yrs(2006, 2024) },
                },
                'Genesis': {
                    'G80': { years: yrs(2016, 2024) },
                    'GV80': { years: yrs(2020, 2024) },
                },
                'Chrysler': {
                    '300': { years: yrs(2005, 2024) },
                },
                'Dodge': {
                    'Charger': { years: yrs(2006, 2024) },
                    'Challenger': { years: yrs(2008, 2024) },
                },
                'Jeep': {
                    'Grand Cherokee': { years: yrs(2005, 2024) },
                    'Wrangler': { years: yrs(2005, 2024) },
                    'Compass': { years: yrs(2007, 2024) },
                },
                'Cadillac': {
                    'Escalade': { years: yrs(2007, 2024) },
                    'CTS': { years: yrs(2008, 2019) },
                },
                'GMC': {
                    'Yukon': { years: yrs(2007, 2024) },
                    'Sierra': { years: yrs(2007, 2024) },
                },
                'Buick': {
                    'Enclave': { years: yrs(2008, 2024) },
                },
                'Lincoln': {
                    'Navigator': { years: yrs(2007, 2024) },
                },
                'Bentley': {
                    'Continental GT': { years: yrs(2005, 2024) },
                },
                'Rolls-Royce': {
                    'Phantom': { years: yrs(2005, 2024) },
                    'Ghost': { years: yrs(2010, 2024) },
                },
                'Lamborghini': {
                    'Huracan': { years: yrs(2014, 2024) },
                    'Urus': { years: yrs(2018, 2024) },
                },
                'Aston Martin': {
                    'DB11': { years: yrs(2016, 2024) },
                    'Vantage': { years: yrs(2005, 2024) },
                },
                'McLaren': {
                    '570S': { years: yrs(2015, 2024) },
                },
                'Smart': {
                    'ForTwo': { years: yrs(2007, 2024) },
                },
                'Isuzu': {
                    'D-Max': { years: yrs(2007, 2024) },
                    'NPR': { years: yrs(2005, 2024) },
                },
                'Mitsubishi': {
                    'Lancer': { years: yrs(2007, 2017) },
                    'Outlander': { years: yrs(2006, 2024) },
                    'Pajero': { years: yrs(2006, 2021) },
                },
                'Suzuki': {
                    'Vitara': { years: yrs(2015, 2024) },
                    'Swift': { years: yrs(2005, 2024) },
                },
                'SsangYong': {
                    'Rexton': { years: yrs(2006, 2024) },
                    'Korando': { years: yrs(2010, 2024) },
                },
                'Daewoo': {
                    'Nexia': { years: yrs(2005, 2016) },
                    'Lanos': { years: yrs(2005, 2009) },
                },
                'Lada': {
                    'Granta': { years: yrs(2011, 2024) },
                    'Vesta': { years: yrs(2015, 2024) },
                    'Niva': { years: yrs(2005, 2024) },
                },
                'GAZ': {
                    'Gazelle': { years: yrs(2005, 2024) },
                },
                'UAZ': {
                    'Patriot': { years: yrs(2005, 2024) },
                },
                'Chery': {
                    'Tiggo': { years: yrs(2015, 2024) },
                },
                'Geely': {
                    'Coolray': { years: yrs(2019, 2024) },
                    'Emgrand': { years: yrs(2016, 2024) },
                },
                'Haval': {
                    'H6': { years: yrs(2017, 2024) },
                    'Jolion': { years: yrs(2020, 2024) },
                },
                'BYD': {
                    'Song': { years: yrs(2019, 2024) },
                    'Han': { years: yrs(2020, 2024) },
                },
                'JAC': {
                    'J7': { years: yrs(2020, 2024) },
                },
                'Changan': {
                    'CS35': { years: yrs(2018, 2024) },
                },
            },
            getMakeFromWMI(wmi) {
                const found = Object.keys(this.wmiMap).find(key => wmi.startsWith(key));
                return found ? this.wmiMap[found].make : null;
            },
            getModelData(make, model) {
                const makeData = this.models[make];
                if (!makeData) return null;
                const modelKey = Object.keys(makeData).find(m => m.toLowerCase() === model.toLowerCase());
                if (modelKey) return { model: modelKey, data: makeData[modelKey] };
                return null;
            },
            lookupLocal(vin) {
                const wmi = vin.substring(0, 3);
                const make = this.getMakeFromWMI(wmi);
                return make ? { make } : null;
            },
            getAllMakes() { return Object.keys(this.models).sort(); },
            getModelsForMake(make) { return Object.keys(this.models[make] || {}).sort(); },
            getYearsForModel(make, model) {
                const data = this.getModelData(make, model);
                return data ? data.data.years : [];
            }
        };


        // ===== VIN MATCHER & UI =====
        const VinMatcher = {
            normalize(str) {
                if (!str) return '';
                return str.toLowerCase().replace(/[^a-z0-9]/g, '');
            },
            matchProductsMultiLevel(products, vehicle) {
                if (!products || products.length === 0) return { exact: [], yearRange: [], modelKeyword: [], fallback: [] };
                const makeNorm = this.normalize(vehicle.make);
                const modelNorm = this.normalize(vehicle.model);
                const year = parseInt(vehicle.year) || 0;
                const result = { exact: [], yearRange: [], modelKeyword: [], fallback: [] };
                products.forEach(p => {
                    const pMake = this.normalize(p.carBrand);
                    const pModel = this.normalize(p.carModel);
                    const pYear = parseInt(p.carYear) || 0;
                    if (pMake === makeNorm && pModel === modelNorm && (year === 0 || pYear === year)) {
                        result.exact.push(p);
                        return;
                    }
                    if (pMake === makeNorm && pModel === modelNorm && (year === 0 || (pYear >= year - 3 && pYear <=
                            year + 3))) {
                        result.yearRange.push(p);
                        return;
                    }
                    if (pMake === makeNorm && pModel && modelNorm &&
                        (pModel.includes(modelNorm) || modelNorm.includes(pModel))) {
                        result.modelKeyword.push(p);
                        return;
                    }
                    if (pMake === makeNorm) {
                        result.fallback.push(p);
                    }
                });
                return result;
            }
        };

        const VinUI = {
            showLoading() {
                const container = document.getElementById('vinResult');
                container.innerHTML =
                    `
                    <div class="vin-loading">
                        <div class="spinner"></div>
                        <p style="margin-top:1rem;">VIN dekodlanır...</p>
                        <p class="text-muted fs-small">Yerli kataloq və API mənbələrindən məlumat alınır</p>
                    </div>
                `;
            },
            showError(message) {
                const container = document.getElementById('vinResult');
                container.innerHTML =
                    `
                    <div class="vin-error">
                        <i class="fas fa-exclamation-circle"></i> ${message}
                        <br><small class="text-muted">Zəhmət olmasa VIN-i yoxlayın və ya əl ilə axtarışdan istifadə edin.</small>
                    </div>
                `;
            },
            renderResult(vin, vehicle, source, matchedProducts) {
                const container = document.getElementById('vinResult');
                const v = vehicle || {};
                const make = v.make || 'Məlumat tapılmadı';
                const model = v.model || '';
                const year = v.year || '';

                let html = `
                    <div class="vin-vehicle-card">
                        <div class="flex-between">
                            <div>
                                <div class="vehicle-title">${make} ${model}</div>
                                <div class="vehicle-subtitle">${year}</div>
                            </div>
                            <div style="font-size:0.8rem;color:var(--surface-text-secondary);font-family:monospace;text-align:right;">
                                <div>${vin}</div>
                                <div style="font-size:0.65rem;color:${v.vinValid !== false ? '#34d399' : '#f87171'}">
                                    <i class="fas ${v.vinValid !== false ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                                    ${v.vinValid !== false ? 'Doğrulandı' : 'Doğrulanmadı'}
                                </div>
                                <div style="font-size:0.6rem;color:var(--surface-text-secondary);">Mənbə: ${source}</div>
                            </div>
                        </div>
                        <div class="vin-specs-grid">
                            ${Object.entries({
                                'Marka': v.make || 'Məlumat tapılmadı',
                                'Model': v.model || 'Məlumat tapılmadı',
                                'İl': v.year || 'Məlumat tapılmadı',
                                'Kuzov': v.bodyClass || 'Məlumat tapılmadı',
                                'Mühərrik': `${v.engineCylinders || '?'} sil. ${v.displacementL || ''}`,
                                'Yanacaq': v.fuelType || 'Məlumat tapılmadı',
                                'Transmissiya': v.transmission || 'Məlumat tapılmadı',
                                'Ötürücü': v.driveType || 'Məlumat tapılmadı',
                                'İstehsal ölkəsi': v.plantCountry || 'Məlumat tapılmadı',
                            }).map(([key, val]) => `
                                <div class="vin-spec-item">
                                    <div class="label">${key}</div>
                                    <div class="value">${val}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

                const multiMatch = matchedProducts || { exact: [], yearRange: [], modelKeyword: [], fallback: [] };
                const allMatched = [...multiMatch.exact, ...multiMatch.yearRange, ...multiMatch.modelKeyword, ...multiMatch
                    .fallback
                ];

                if (allMatched.length > 0) {
                    html += `
                        <div class="vin-vehicle-card">
                            <div class="vin-parts-section">
                                <h4 style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--surface-text-secondary);font-weight:500;">
                                    <i class="fas fa-warehouse" style="color:#34d399;"></i> Anbarımızdakı Uyğun Məhsullar (${allMatched.length})
                                </h4>
                                <div style="margin-top:0.5rem;font-size:0.7rem;color:var(--surface-text-secondary);">
                                    <span class="badge badge-success">Dəqiq: ${multiMatch.exact.length}</span>
                                    <span class="badge badge-info">İl diapazonu: ${multiMatch.yearRange.length}</span>
                                    <span class="badge badge-warning">Model söz: ${multiMatch.modelKeyword.length}</span>
                                    <span class="badge badge-secondary">Marka: ${multiMatch.fallback.length}</span>
                                </div>
                                <div class="vin-parts-grid">
                                    ${allMatched.slice(0, 20).map(p => `
                                        <div class="vin-part-card">
                                            ${p.image ? `<img src="${p.image}" class="part-image" alt="${p.name}">` : `<div class="part-image" style="display:flex;align-items:center;justify-content:center;color:var(--surface-text-secondary);"><i class="fas fa-image" style="font-size:2rem;opacity:0.3;"></i></div>`}
                                            <div class="part-name">${p.name}</div>
                                            <div class="part-code">${p.oem || p.code || ''}</div>
                                            <div class="part-stock"><i class="fas fa-cubes"></i> Stok: ${p.stock || 0}</div>
                                            <div class="part-price">${fmtMoney(p.sellPrice || 0)}</div>
                                            <div class="part-supplier"><i class="fas fa-truck"></i> ${p.supplier || '366 AUTO'}</div>
                                            <div class="part-actions">
                                                <button class="btn btn-primary btn-sm" onclick="addToCartFromSearch('${p.id}')">
                                                    <i class="fas fa-cart-plus"></i> Səbətə əlavə et
                                                </button>
                                                <button class="btn btn-outline btn-sm" onclick="editProduct('${p.id}')"><i class="fas fa-eye"></i></button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="vin-vehicle-card" style="border-left:4px solid #f59e0b;">
                            <div style="display:flex;flex-direction:column;align-items:center;padding:1rem 0;">
                                <i class="fas fa-box-open" style="font-size:3rem;opacity:0.3;margin-bottom:1rem;"></i>
                                <p style="font-weight:600;">Bu VIN-ə uyğun anbar məhsulu tapılmadı.</p>
                                <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin-top:0.5rem;">
                                    <a href="https://partsouq.com/en/search/search?q=${vin}" target="_blank" class="btn btn-outline btn-sm">
                                        <i class="fas fa-external-link-alt"></i> Partsouq.com
                                    </a>
                                    <a href="https://emex.ru/search?vin=${vin}" target="_blank" class="btn btn-outline btn-sm">
                                        <i class="fas fa-external-link-alt"></i> Emex.ru
                                    </a>
                                    <button class="btn btn-primary btn-sm" onclick="sendWhatsAppInquiry('${vin}')">
                                        <i class="fab fa-whatsapp"></i> Sorğu göndər
                                    </button>
                                    <button class="btn btn-outline btn-sm" onclick="searchManual('${vin}')">
                                        <i class="fas fa-search"></i> Əl ilə axtar
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }
                container.innerHTML = html;
            }
        };

        // ===== VIN API =====
        const VinAPI = {
            async fetchNHTSA(vin) {
                const response = await fetch(
                    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`);
                if (!response.ok) throw new Error(`NHTSA API xətası: ${response.status}`);
                const data = await response.json();
                if (!data.Results || data.Results.length === 0) throw new Error('NHTSA məlumat tapılmadı');
                return data.Results;
            },
            async fetchDBVin(vin) {
                const response = await fetch(`https://db.vin/api/vin/${vin}`);
                if (!response.ok) throw new Error(`DB.VIN API xətası: ${response.status}`);
                const data = await response.json();
                if (!data || !data.make) throw new Error('DB.VIN məlumat tapılmadı');
                return [
                    { Variable: 'Make', Value: data.make || '' },
                    { Variable: 'Model', Value: data.model || '' },
                    { Variable: 'ModelYear', Value: data.year || data.modelYear || '' },
                    { Variable: 'BodyClass', Value: data.bodyClass || data.body_style || '' },
                    { Variable: 'EngineCylinders', Value: data.cylinders || '' },
                    { Variable: 'DisplacementL', Value: data.displacement || '' },
                    { Variable: 'FuelTypePrimary', Value: data.fuel_type || data.fuel || '' },
                    { Variable: 'TransmissionStyle', Value: data.transmission || '' },
                    { Variable: 'DriveType', Value: data.drive || '' },
                    { Variable: 'PlantCountry', Value: data.country || '' },
                ];
            },
            async search(vin) {
                const cacheKey = `vin_${vin}`;
                const cached = VinCache.get(cacheKey);
                if (cached) return cached;

                let results = null,
                    source = '';
                try {
                    results = await this.fetchNHTSA(vin);
                    source = 'NHTSA';
                } catch (e1) {
                    console.warn('NHTSA uğursuz, DB.VIN-ə keçilir:', e1.message);
                    try {
                        results = await this.fetchDBVin(vin);
                        source = 'DB.VIN';
                    } catch (e2) {
                        console.error('Hər iki API uğursuz:', e2.message);
                        const local = VinDatabase.lookupLocal(vin);
                        if (local) {
                            return { data: { make: local.make, vinValid: false }, source: 'Yerli kataloq (API xətası)' };
                        }
                        throw new Error('VIN məlumatı tapılmadı.');
                    }
                }
                const normalized = this.normalizeResults(results, vin);
                VinCache.set(cacheKey, { data: normalized, source, timestamp: Date.now() });
                return { data: normalized, source };
            },
            normalizeResults(results, vin) {
                const map = {};
                results.forEach(item => { if (item.Variable && item.Value) map[item.Variable] = item.Value; });
                return {
                    make: map.Make || '',
                    model: map.Model || '',
                    year: map.ModelYear || '',
                    bodyClass: map.BodyClass || '',
                    engineCylinders: map.EngineCylinders || '',
                    displacementL: map.DisplacementL || '',
                    fuelType: map.FuelTypePrimary || '',
                    transmission: map.TransmissionStyle || '',
                    driveType: map.DriveType || '',
                    plantCountry: map.PlantCountry || '',
                    vinValid: this.validateVin(vin),
                };
            },
            validateVin(vin) {
                if (!vin || vin.length !== 17) return false;
                if (/[IOQ]/.test(vin)) return false;
                const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
                const chars = '0123456789X';
                let sum = 0;
                for (let i = 0; i < 17; i++) {
                    const char = vin[i];
                    let value;
                    if (char >= '0' && char <= '9') value = parseInt(char);
                    else if (char >= 'A' && char <= 'Z') {
                        const code = char.charCodeAt(0) - 64;
                        value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                            26
                        ][code - 1] || 0;
                    } else value = 0;
                    sum += value * weights[i];
                }
                const checkDigit = chars[sum % 11];
                return vin[8] === checkDigit;
            }
        };

        const VinCache = {
            TTL: 7 * 24 * 60 * 60 * 1000,
            get(key) {
                try {
                    const raw = localStorage.getItem('vin_cache_' + key);
                    if (!raw) return null;
                    const data = JSON.parse(raw);
                    if (Date.now() - data.timestamp > this.TTL) {
                        localStorage.removeItem('vin_cache_' + key);
                        return null;
                    }
                    return data.data;
                } catch { return null; }
            },
            set(key, data) {
                try { localStorage.setItem('vin_cache_' + key, JSON.stringify(data)); } catch { /* ignore */ }
            }
        };


        // ===== ƏL İLƏ AXTAR =====
        function populateManualSelects() {
            const makeSelect = document.getElementById('manualMake');
            if (!makeSelect) return;
            const makes = VinDatabase.getAllMakes();
            makeSelect.innerHTML = '<option value="">— Marka seçin —</option>' +
                makes.map(m => `<option value="${m}">${m}</option>`).join('');

            makeSelect.addEventListener('change', function() {
                const modelSelect = document.getElementById('manualModel');
                const yearSelect = document.getElementById('manualYear');
                const selectedMake = this.value;
                if (!selectedMake) {
                    modelSelect.innerHTML = '<option value="">— Əvvəlcə marka seçin —</option>';
                    yearSelect.innerHTML = '<option value="">— İl seçin —</option>';
                    return;
                }
                const models = VinDatabase.getModelsForMake(selectedMake);
                modelSelect.innerHTML = '<option value="">— Model seçin —</option>' +
                    models.map(m => `<option value="${m}">${m}</option>`).join('');
                yearSelect.innerHTML = '<option value="">— İl seçin —</option>';
            });

            document.getElementById('manualModel').addEventListener('change', function() {
                const yearSelect = document.getElementById('manualYear');
                const make = document.getElementById('manualMake').value;
                const model = this.value;
                if (!make || !model) {
                    yearSelect.innerHTML = '<option value="">— İl seçin —</option>';
                    return;
                }
                const years = VinDatabase.getYearsForModel(make, model);
                yearSelect.innerHTML = '<option value="">— İl seçin —</option>' +
                    years.map(y => `<option value="${y}">${y}</option>`).join('');
            });
        }

        function searchByMakeModel() {
            const make = document.getElementById('manualMake').value;
            const model = document.getElementById('manualModel').value;
            const year = document.getElementById('manualYear').value;
            if (!make || !model) {
                toast('Zəhmət olmasa marka və model seçin!', 'warning');
                return;
            }
            const vehicle = { make, model, year: year || '', vinValid: true };
            const products = getProducts();
            const matched = VinMatcher.matchProductsMultiLevel(products, vehicle);
            VinUI.renderResult(`Əl ilə: ${make} ${model} ${year}`, vehicle, 'Yerli kataloq (əl seçim)', matched);
        }


        // ===== VIN performSearch =====
        async function performSearch() {
            const input = document.getElementById('vinInput');
            const query = input.value.trim();
            if (!query) { VinUI.showError('Zəhmət olmasa VIN kodunu daxil edin!'); return; }
            const vin = query.toUpperCase().replace(/\s/g, '');
            if (vin.length !== 17) { VinUI.showError('VIN kodu 17 simvoldan ibarət olmalıdır!'); return; }
            if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) { VinUI.showError(
                'VIN kodu yalnız rəqəmlər və (I, O, Q istisna olmaqla) hərflərdən ibarət ola bilər!'); return; }

            VinUI.showLoading();
            let vehicle = {},
                source = 'Yerli kataloq';
            let localInfo = null;
            try {
                const local = VinDatabase.lookupLocal(vin);
                if (local && local.make) {
                    vehicle.make = local.make;
                    source = 'Yerli kataloq (WMI)';
                    localInfo = local;
                }
            } catch (e) { console.warn('Local lookup error:', e); }

            if (!vehicle.make) {
                try {
                    const result = await VinAPI.search(vin);
                    vehicle = result.data || {};
                    source = result.source || 'API';
                } catch (error) {
                    console.warn('API error:', error);
                    if (localInfo && localInfo.make) {
                        vehicle.make = localInfo.make;
                        source = 'Yerli kataloq (API xətası)';
                    } else {
                        VinUI.showError(
                            'VIN məlumatı tapılmadı. Zəhmət olmasa VIN-i yoxlayın və ya "Əl ilə axtar" düyməsini istifadə edin.'
                            );
                        return;
                    }
                }
            } else {
                try {
                    const result = await VinAPI.search(vin);
                    if (result && result.data) {
                        Object.assign(vehicle, result.data);
                        source = result.source || 'API + Yerli';
                    }
                } catch (e) { console.warn('API əlavə məlumat alınmadı:', e); }
            }
            if (vehicle.vinValid === undefined) vehicle.vinValid = true;
            const products = getProducts();
            const matched = VinMatcher.matchProductsMultiLevel(products, vehicle);
            VinUI.renderResult(vin, vehicle, source, matched);
        }


        // ===== 320+ MƏHSUL GENERATORU =====
        function generateSampleProducts() {
            const categories = [
                'Mühərrik hissələri', 'Əyləc sistemi', 'Süspansiyon', 'Elektrik avadanlığı',
                'Filtrlər', 'Yağlar və mayelər', 'İqlim sistemi', 'Egzoz sistemi',
                'Transmissiya', 'Təkərlər və disklər', 'Karoser hissələri',
                'İnterior aksesuarlar', 'İşıqlandırma', 'Şüşələr', 'Silecekler'
            ];

            const partNames = {
                'Mühərrik hissələri': ['Yağ filtri', 'Hava filtri', 'Mühərrik yağı 5W-30', 'Şam dəsti', 'Zamanlama kəməri',
                    'Termostat', 'Su nasosu', 'Yağ nasosu', 'Krank mili', 'Piston', 'Silindr başlığı', 'Klavan',
                    'Möhür dəsti', 'Conta dəsti', 'Kəmər gərginliyi', 'Kasnak', 'Mühərrik yastığı', 'Egzoz manifoldu',
                    'Emme manifoldu', 'Yağ soyuducusu'
                ],
                'Əyləc sistemi': ['Ön əyləc diskləri', 'Arxa əyləc diskləri', 'Əyləc yastıqları', 'Əyləc mayesi',
                    'Əyləc borusu', 'Əyləc silindri', 'Əyləc kaliperi', 'ABS sensoru', 'Əyləc pedalı', 'Vakuum gücləndirici',
                    'Tənzimləyici klapan', 'Əyləc şlanqı', 'Park əyləci kabeli', 'Əyləc diski qoruyucusu',
                    'Əyləc yastığı aşınma sensoru'
                ],
                'Süspansiyon': ['Ön amortizator', 'Arxa amortizator', 'Ön qolu', 'Arxa qol', 'Mühərrik yastığı',
                    'Süspansiyon yayı', 'Stabilizator', 'Burç dəsti', 'Top birləşməsi', 'Rulda çubuğu',
                    'Rulda ucu', 'Təkər rulmanı', 'Təkər diski', 'Təkər boltları', 'Hava süspansiyon yastığı'
                ],
                'Elektrik avadanlığı': ['Akumulyator 60Ah', 'Generator', 'Starter', 'Qığılcım şamları', 'Alovlanma bobini',
                    'Tənzimləyici', 'Siqaret çakmağı', 'Qoruyucu bloku', 'Röle', 'Batareya naqili', 'Şarj relesi',
                    'Elektrik mühərriki', 'Sürət sensoru', 'Oksigen sensoru', 'Təzyiq sensoru', 'MASA sensoru'
                ],
                'Filtrlər': ['Yağ filtri', 'Hava filtri', 'Kabin filtri', 'Yanacaq filtri', 'Transmissiya filtri',
                    'Yağ ayırıcı', 'Hava filtr qutusu', 'Karbon filtri', 'Toz filtri'
                ],
                'Yağlar və mayelər': ['Mühərrik yağı 5W-30', 'Transmissiya yağı', 'Əyləc mayesi', 'Antifriz',
                    'Yağ əlavəsi', 'Yanacaq əlavəsi', 'Kondisioner qazı R134a', 'Sükan yağı', 'Şüşə yuyucu maye',
                    'Sürtkü yağı'
                ],
                'İqlim sistemi': ['Kondisioner kompressoru', 'Kondensator', 'Buxarlandırıcı', 'İqlim ventili',
                    'Termostat', 'Fan motoru', 'Fan qanadları', 'İqlim idarə paneli', 'Şlanq dəsti', 'Qaz doldurma vanası'
                ],
                'Egzoz sistemi': ['Katalizator', 'Egzoz manifoldu', 'Egzoz borusu', 'Səsboğucu', 'Lambda sensoru',
                    'Egzoz yastığı', 'Bağlayıcı', 'Bərkidici'
                ],
                'Transmissiya': ['Sürət qutusu yağı', 'Mufta dəsti', 'Sürət qutusu filtri', 'Sürət qutusu nasosu',
                    'Debriyaj pedalı', 'Sürət seçici', 'Transmissiya idarə bloku', 'CVT kəməri', 'Diferensial yağı'
                ],
                'Təkərlər və disklər': ['Yay təkəri 205/55 R16', 'Qış təkəri 205/55 R16', 'Təkər diski 16"',
                    'Təkər boltları', 'Təkər qapağı', 'Təkər təzyiq sensoru', 'Təkər balans çəkisi', 'Ehtiyat təkər'
                ],
                'Karoser hissələri': ['Ön bamper', 'Arxa bamper', 'Kapot', 'Bagaj qapağı', 'Ön qanad', 'Arxa qanad',
                    'Asqı', 'Spoiler', 'Bamper amortizatoru'
                ],
                'İnterior aksesuarlar': ['Oturmaq örtüyü', 'Döşək', 'Sükan örtüyü', 'Qapı çubuğu', 'Ayaqaltı',
                    'Alət paneli örtüyü', 'Mərkəzi konsol', 'İnterior işıqlandırma'
                ],
                'İşıqlandırma': ['Ön faralar', 'Arxa faralar', 'Gündüz işıqları', 'Dönmə siqnalı', 'Arxa işıq',
                    'Fara lampası H7', 'LED lampa', 'Fara tənzimləyicisi'
                ],
                'Şüşələr': ['Ön şüşə', 'Arxa şüşə', 'Yan şüşə', 'Güzgü şüşəsi', 'Şüşə yapışqanı', 'Şüşə çərçivəsi',
                    'Günəşlıq'
                ],
                'Silecekler': ['Ön silecek çubuğu', 'Arxa silecek çubuğu', 'Silecek motoru', 'Silecek qolu',
                    'Silecek süngəri', 'Silecek qoruyucusu'
                ]
            };

            const makeModelPairs = [];
            const makes = VinDatabase.getAllMakes();
            makes.forEach(make => {
                const models = VinDatabase.getModelsForMake(make);
                models.forEach(model => {
                    makeModelPairs.push({ make, model });
                });
            });

            const products = [];
            let idCounter = 1;
            categories.forEach(cat => {
                const names = partNames[cat] || [`${cat} hissə`];
                for (let i = 0; i < 20; i++) {
                    const name = names[i % names.length] + (i >= names.length ? ` ${Math.floor(i/names.length)+1}` : '');
                    const pair = makeModelPairs[Math.floor(Math.random() * makeModelPairs.length)];
                    const year = 2005 + Math.floor(Math.random() * 19);
                    const price = Math.floor(Math.random() * 100) + 10;
                    const stock = Math.floor(Math.random() * 50) + 5;
                    products.push({
                        id: 'p' + (idCounter++),
                        name: name,
                        oem: 'OEM-' + String(idCounter).padStart(4, '0'),
                        category: cat,
                        subcategory: '',
                        brand: '',
                        code: 'COD' + String(idCounter).padStart(4, '0'),
                        sku: 'SKU' + String(idCounter).padStart(4, '0'),
                        barcode: 'BAR' + String(idCounter).padStart(4, '0'),
                        carBrand: pair.make,
                        carModel: pair.model,
                        carYear: String(year),
                        engine: '1.8L',
                        country: 'DE',
                        supplier: '366 AUTO',
                        buyPrice: price * 0.6,
                        sellPrice: price,
                        minPrice: price * 0.5,
                        discount: Math.floor(Math.random() * 10),
                        stock: stock,
                        minStock: 5,
                        warehouse: 'A' + Math.floor(Math.random() * 5 + 1),
                        shelf: 'R' + Math.floor(Math.random() * 10 + 1),
                        note: '',
                        image: '',
                    });
                }
            });
            return products;
        }


        // ===== RENDER FUNKSİYALARI =====
        function renderProducts() {
            const search = document.getElementById('productSearch')?.value?.toLowerCase() || '';
            const category = document.getElementById('productCategoryFilter')?.value || '';
            const allProducts = getProducts();

            let filtered = allProducts.filter(p => {
                const matchSearch =
                    p.name?.toLowerCase().includes(search) ||
                    p.oem?.toLowerCase().includes(search) ||
                    p.code?.toLowerCase().includes(search) ||
                    p.barcode?.toLowerCase().includes(search) ||
                    p.carBrand?.toLowerCase().includes(search) ||
                    p.carModel?.toLowerCase().includes(search) ||
                    p.category?.toLowerCase().includes(search) ||
                    p.sku?.toLowerCase().includes(search);
                const matchCategory = category === '' || p.category === category;
                return matchSearch && matchCategory;
            });

            const catSelect = document.getElementById('productCategoryFilter');
            if (catSelect) {
                const currentVal = catSelect.value;
                const cats = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
                catSelect.innerHTML = '<option value="">Bütün kateqoriyalar</option>' +
                    cats.map(c => `<option value="${c}">${c}</option>`).join('');
                catSelect.value = currentVal;
            }

            const pageSize = state.productPageSize || 15;
            const totalPages = Math.ceil(filtered.length / pageSize) || 1;
            if (state.productPage > totalPages) state.productPage = totalPages;
            if (state.productPage < 1) state.productPage = 1;

            const start = (state.productPage - 1) * pageSize;
            const end = Math.min(start + pageSize, filtered.length);
            const pageItems = filtered.slice(start, end);

            const tbody = document.getElementById('productsTable');
            if (!tbody) return;

            if (pageItems.length === 0) {
                tbody.innerHTML =
                    `<tr><td colspan="10" class="text-center text-muted" style="padding:2rem;">🔍 Heç bir məhsul tapılmadı</td></tr>`;
            } else {
                tbody.innerHTML = pageItems.map((p, idx) => {
                    const profit = (p.sellPrice && p.buyPrice) ? (((p.sellPrice - p.buyPrice) / p.buyPrice) * 100)
                        .toFixed(1) : '-';
                    return `
                        <tr>
                            <td>${start + idx + 1}</td>
                            <td>${p.image ? `<img src="${p.image}" style="width:40px;height:40px;object-fit:contain;border-radius:4px;background:rgba(255,255,255,0.04);">` : '<i class="fas fa-image" style="opacity:0.3;font-size:20px;"></i>'}</td>
                            <td><strong>${p.name || '—'}</strong></td>
                            <td><code style="font-size:0.75rem;background:var(--color-liquid-deep);padding:2px 6px;border-radius:4px;">${p.oem || '—'}</code></td>
                            <td>${p.category || '—'}</td>
                            <td style="color:${(p.stock || 0) < (p.minStock || 5) ? '#f87171' : '#34d399'}">${p.stock || 0}</td>
                            <td>${fmtMoney(p.buyPrice || 0)}</td>
                            <td>${fmtMoney(p.sellPrice || 0)}</td>
                            <td style="color:${profit !== '-' && profit < 0 ? '#f87171' : '#34d399'}">${profit}%</td>
                            <td>
                                <button class="btn btn-primary btn-sm" onclick="editProduct('${p.id}')"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')"><i class="fas fa-trash"></i></button>
                                <button class="btn btn-outline btn-sm" onclick="generateBarcode('${p.id}')"><i class="fas fa-barcode"></i></button>
                                <button class="btn btn-success btn-sm" onclick="addToCart('${p.id}')"><i class="fas fa-cart-plus"></i></button>
                            </td>
                        </tr>
                    `;
                }).join('');
            }

            document.getElementById('productCount').textContent = `${filtered.length} məhsul`;
            document.getElementById('productPageInfo').textContent = `${state.productPage} / ${totalPages}`;
        }

        function prevProductPage() {
            if (state.productPage > 1) { state.productPage--;
                renderProducts(); }
        }

        function nextProductPage() {
            const all = getProducts();
            const search = document.getElementById('productSearch')?.value?.toLowerCase() || '';
            const category = document.getElementById('productCategoryFilter')?.value || '';
            const filtered = all.filter(p => {
                const matchSearch =
                    p.name?.toLowerCase().includes(search) ||
                    p.oem?.toLowerCase().includes(search) ||
                    p.code?.toLowerCase().includes(search) ||
                    p.barcode?.toLowerCase().includes(search) ||
                    p.carBrand?.toLowerCase().includes(search) ||
                    p.carModel?.toLowerCase().includes(search) ||
                    p.category?.toLowerCase().includes(search) ||
                    p.sku?.toLowerCase().includes(search);
                const matchCategory = category === '' || p.category === category;
                return matchSearch && matchCategory;
            });
            const totalPages = Math.ceil(filtered.length / (state.productPageSize || 15)) || 1;
            if (state.productPage < totalPages) { state.productPage++;
                renderProducts(); }
        }

        function renderPosProducts() {
            const search = document.getElementById('posSearch')?.value?.toLowerCase() || '';
            const make = document.getElementById('posMakeFilter')?.value || '';
            const model = document.getElementById('posModelFilter')?.value || '';
            const year = document.getElementById('posYearFilter')?.value || '';
            const category = document.getElementById('posCategoryFilter')?.value || '';

            const allProducts = getProducts();

            let products = allProducts.filter(p => {
                const matchSearch =
                    p.name?.toLowerCase().includes(search) ||
                    p.oem?.toLowerCase().includes(search) ||
                    p.barcode?.toLowerCase().includes(search);
                const matchMake = make === '' || p.carBrand === make;
                const matchModel = model === '' || p.carModel === model;
                const matchYear = year === '' || String(p.carYear) === year;
                const matchCategory = category === '' || p.category === category;
                return matchSearch && matchMake && matchModel && matchYear && matchCategory;
            });

            // ===== KASKAD FİLTR: Marka → Model → İl (bütün bazadan) =====
            // 1) MARKA — həmişə bütün bazadakı markaları göstərir (ilk seçim addımı)
            const makeSelect = document.getElementById('posMakeFilter');
            if (makeSelect) {
                const currentVal = makeSelect.value;
                const makes = [...new Set(allProducts.map(p => p.carBrand).filter(Boolean))].sort();
                makeSelect.innerHTML = '<option value="">1. Marka seçin</option>' +
                    makes.map(m => `<option value="${m}">${m}</option>`).join('');
                makeSelect.value = makes.includes(currentVal) ? currentVal : '';
            }

            // 2) MODEL — seçilmiş markaya uyğun modellərlə məhdudlaşır
            const modelSelect = document.getElementById('posModelFilter');
            if (modelSelect) {
                const currentVal = modelSelect.value;
                const poolForModel = make ? allProducts.filter(p => p.carBrand === make) : allProducts;
                const models = [...new Set(poolForModel.map(p => p.carModel).filter(Boolean))].sort();
                modelSelect.innerHTML = '<option value="">2. Model seçin</option>' +
                    models.map(m => `<option value="${m}">${m}</option>`).join('');
                modelSelect.value = models.includes(currentVal) ? currentVal : '';
            }

            // 3) İL — seçilmiş marka + modelə uyğun illərlə məhdudlaşır
            const yearSelect = document.getElementById('posYearFilter');
            if (yearSelect) {
                const currentVal = yearSelect.value;
                let poolForYear = allProducts;
                if (make) poolForYear = poolForYear.filter(p => p.carBrand === make);
                if (modelSelect && modelSelect.value) poolForYear = poolForYear.filter(p => p.carModel === modelSelect.value);
                const years = [...new Set(poolForYear.map(p => p.carYear).filter(Boolean))].sort();
                yearSelect.innerHTML = '<option value="">3. İl seçin</option>' +
                    years.map(y => `<option value="${y}">${y}</option>`).join('');
                yearSelect.value = years.includes(currentVal) ? currentVal : '';
            }

            // 4) KATEQORİYA — müstəqildir, bütün bazadan
            const catSelect = document.getElementById('posCategoryFilter');
            if (catSelect) {
                const currentVal = catSelect.value;
                const cats = [...new Set(allProducts.map(p => p.category).filter(Boolean))].sort();
                catSelect.innerHTML = '<option value="">4. Kateqoriya seçin</option>' +
                    cats.map(c => `<option value="${c}">${c}</option>`).join('');
                catSelect.value = cats.includes(currentVal) ? currentVal : '';
            }

            const container = document.getElementById('posProductList');
            if (!container) return;
            if (products.length === 0) {
                container.innerHTML = `<div class="text-center text-muted" style="padding:2rem;">Heç bir məhsul tapılmadı</div>`;
                return;
            }
            container.innerHTML = products.slice(0, 50).map(p => `
                <div class="pos-item" onclick="addToCart('${p.id}')">
                    <span><strong>${p.name || '—'}</strong> <span class="text-muted fs-small">${p.oem || ''}</span></span>
                    <span>${fmtMoney(p.sellPrice || 0)} <span class="text-muted fs-small">(${p.stock || 0})</span></span>
                </div>
            `).join('');
        }

        // ===== DASHBOARD, FINANCE, SUPPLIERS, PURCHASES, EMPLOYEES, TAXES, DEBTS, CUSTOMERS =====
        function renderDashboard() {
            const sales = getSales();
            const todaySales = sales.filter(s => s.date?.startsWith(today())).reduce((sum, s) => sum + s.total, 0);
            const monthSales = sales.filter(s => s.date?.startsWith(today().slice(0, 7))).reduce((sum, s) => sum + s.total, 0);
            const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
            const totalExpense = getFinance().filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
            const netProfit = totalRevenue - totalExpense;
            const totalStock = getProducts().reduce((sum, p) => sum + (p.stock || 0), 0);
            const lowStock = getProducts().filter(p => (p.stock || 0) < (p.minStock || 5)).length;

            document.getElementById('statTodaySales').textContent = fmtMoney(todaySales);
            document.getElementById('statMonthSales').textContent = fmtMoney(monthSales);
            document.getElementById('statTotalRevenue').textContent = fmtMoney(totalRevenue);
            document.getElementById('statTotalExpense').textContent = fmtMoney(totalExpense);
            document.getElementById('statNetProfit').textContent = fmtMoney(netProfit);
            document.getElementById('statStockCount').textContent = totalStock;
            document.getElementById('statLowStock').textContent = lowStock;

            const recentSales = sales.slice(-5).reverse();
            const tbody = document.getElementById('recentSales');
            if (tbody) {
                tbody.innerHTML = recentSales.map(s =>
                    `<tr><td>${s.items?.[0]?.name || '—'}</td><td>${s.items?.length || 0}</td><td>${fmtMoney(s.total)}</td><td>${s.date}</td></tr>`
                ).join('');
            }
            const recentProducts = getProducts().slice(-5).reverse();
            const tbody2 = document.getElementById('recentProducts');
            if (tbody2) {
                tbody2.innerHTML = recentProducts.map(p =>
                    `<tr><td>${p.name}</td><td>${p.stock}</td><td>${fmtMoney(p.sellPrice)}</td></tr>`
                ).join('');
            }
        }

        function renderFinance() {
            const finance = getFinance();
            const totalIncome = finance.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
            const totalExpense = finance.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
            document.getElementById('finRevenue').textContent = fmtMoney(totalIncome);
            document.getElementById('finExpense').textContent = fmtMoney(totalExpense);
            document.getElementById('finNet').textContent = fmtMoney(totalIncome - totalExpense);

            const tbody = document.getElementById('financeTable');
            if (!tbody) return;
            if (finance.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted" style="padding:2rem;">Heç bir əməliyyat yoxdur</td></tr>`;
                return;
            }
            tbody.innerHTML = finance.slice(-20).reverse().map(f => `
                <tr>
                    <td>${f.date || '—'}</td>
                    <td><span class="badge ${f.type === 'income' ? 'badge-success' : 'badge-danger'}">${f.type === 'income' ? 'Gəlir' : 'Xərc'}</span></td>
                    <td>${f.category || '—'}</td>
                    <td style="color:${f.type === 'income' ? '#34d399' : '#f87171'}">${fmtMoney(f.amount || 0)}</td>
                    <td>${f.note || '—'}</td>
                </tr>
            `).join('');
        }

        function renderSuppliers() {
            const search = document.getElementById('supplierSearch')?.value?.toLowerCase() || '';
            const suppliers = getSuppliers().filter(s =>
                s.name?.toLowerCase().includes(search) ||
                s.phone?.includes(search) ||
                s.email?.toLowerCase().includes(search)
            );
            const tbody = document.getElementById('suppliersTable');
            if (!tbody) return;
            if (suppliers.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding:2rem;">Heç bir təchizatçı tapılmadı</td></tr>`;
                return;
            }
            tbody.innerHTML = suppliers.map(s => `
                <tr>
                    <td><strong>${s.name || '—'}</strong></td>
                    <td>${s.phone || '—'}</td>
                    <td>${s.email || '—'}</td>
                    <td>${s.address || '—'}</td>
                    <td>${s.voen || '—'}</td>
                    <td>${fmtMoney(s.debt || 0)}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editSupplier('${s.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="deleteSupplier('${s.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        }

        function renderPurchases() {
            const purchases = getPurchases();
            const tbody = document.getElementById('purchasesTable');
            if (!tbody) return;
            if (purchases.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding:2rem;">Heç bir alış yoxdur</td></tr>`;
                return;
            }
            tbody.innerHTML = purchases.slice(-20).reverse().map((p, idx) => `
                <tr>
                    <td>${idx + 1}</td>
                    <td>${p.supplier || '—'}</td>
                    <td>${p.date || '—'}</td>
                    <td>${(p.items || []).length} məhsul</td>
                    <td>${fmtMoney(p.total || 0)}</td>
                    <td><span class="badge badge-success">${p.status || 'tamamlandı'}</span></td>
                    <td><button class="btn btn-outline btn-sm" onclick="viewPurchase('${p.id}')"><i class="fas fa-eye"></i></button></td>
                </tr>
            `).join('');
        }

        function renderEmployees() {
            const employees = getEmployees();
            const tbody = document.getElementById('employeesTable');
            if (!tbody) return;
            if (employees.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding:2rem;">Heç bir işçi yoxdur</td></tr>`;
                return;
            }
            tbody.innerHTML = employees.map(e => `
                <tr>
                    <td><strong>${e.name || '—'} ${e.surname || ''}</strong></td>
                    <td>${e.position || '—'}</td>
                    <td>${e.phone || '—'}</td>
                    <td>${fmtMoney(e.salary || 0)}</td>
                    <td>${fmtMoney(e.bonus || 0)}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editEmployee('${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${e.id}')"><i class="fas fa-trash"></i></button>
                        <button class="btn btn-outline btn-sm" onclick="paySalary('${e.id}')"><i class="fas fa-money-bill-wave"></i></button>
                    </td>
                </tr>
            `).join('');
        }

        function renderTaxes() {
            const taxes = getTaxes();
            const tbody = document.getElementById('taxTable');
            if (!tbody) return;
            if (taxes.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted" style="padding:2rem;">Heç bir vergi ödənişi yoxdur</td></tr>`;
                return;
            }
            tbody.innerHTML = taxes.slice(-20).reverse().map(t => `
                <tr>
                    <td>${t.date || '—'}</td>
                    <td>${t.quarter || '—'}</td>
                    <td>${fmtMoney(t.amount || 0)}</td>
                    <td><span class="badge ${t.status === 'ödənilib' ? 'badge-success' : t.status === 'gecikib' ? 'badge-danger' : 'badge-warning'}">${t.status || '—'}</span></td>
                    <td>${t.note || '—'}</td>
                </tr>
            `).join('');
        }

        function renderDebts() {
            const debts = getDebts();
            const tbody = document.getElementById('debtsTable');
            if (!tbody) return;
            if (debts.length === 0) {
                tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding:2rem;">Heç bir borc yoxdur</td></tr>`;
                return;
            }
            tbody.innerHTML = debts.map(d => {
                const remaining = (d.total || 0) - (d.paid || 0);
                return `
                    <tr>
                        <td><span class="badge ${d.type === 'bizeborcludur' ? 'badge-success' : 'badge-danger'}">${d.type === 'bizeborcludur' ? 'Bizə borcludur' : 'Borcluyuq'}</span></td>
                        <td>${d.person || '—'}</td>
                        <td>${fmtMoney(d.total || 0)}</td>
                        <td>${fmtMoney(d.paid || 0)}</td>
                        <td style="color:${remaining > 0 ? '#f87171' : '#34d399'}">${fmtMoney(remaining)}</td>
                        <td>${d.due || '—'}</td>
                        <td><span class="badge ${d.status === 'aktiv' ? 'badge-warning' : 'badge-success'}">${d.status || '—'}</span></td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editDebt('${d.id}')"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-outline btn-sm" onclick="payDebt('${d.id}')"><i class="fas fa-hand-holding-usd"></i></button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        function renderCustomers() {
            const search = document.getElementById('customerSearch')?.value?.toLowerCase() || '';
            const customers = getCustomers().filter(c =>
                c.name?.toLowerCase().includes(search) ||
                c.phone?.includes(search) ||
                c.carBrand?.toLowerCase().includes(search) ||
                c.carModel?.toLowerCase().includes(search) ||
                c.plate?.toLowerCase().includes(search)
            );
            const tbody = document.getElementById('customersTable');
            if (!tbody) return;
            if (customers.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding:2rem;">Heç bir müştəri tapılmadı</td></tr>`;
                return;
            }
            tbody.innerHTML = customers.map(c => `
                <tr>
                    <td><strong>${c.name || '—'}</strong></td>
                    <td>${c.phone || '—'}</td>
                    <td>${c.carBrand || '—'} ${c.carModel || ''}</td>
                    <td>${c.plate || '—'}</td>
                    <td>${fmtMoney(c.debt || 0)}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editCustomer('${c.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${c.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        }


        // ===== SƏBƏT FUNKSİYALARI =====
        function addToCart(productId) {
            const product = getProducts().find(p => p.id === productId);
            if (!product) { toast('Məhsul tapılmadı!', 'danger'); return; }
            if ((product.stock || 0) < 1) { toast('Stokda yoxdur!', 'warning'); return; }
            const existing = state.posCart.find(item => item.id === productId);
            if (existing) { existing.qty++; } else { state.posCart.push({ ...product, qty: 1 }); }
            renderPosCart();
            toast(`${product.name} səbətə əlavə edildi!`);
        }

        function renderPosCart() {
            const container = document.getElementById('posCartItems');
            if (!container) return;
            if (state.posCart.length === 0) {
                container.innerHTML = `<div class="text-center text-muted" style="padding:2rem;">Səbət boşdur</div>`;
                updatePosTotal();
                return;
            }
            container.innerHTML = state.posCart.map(item => `
                <div class="cart-item">
                    <span><strong>${item.name || '—'}</strong> <span class="text-muted fs-small">${fmtMoney(item.sellPrice || 0)}</span></span>
                    <div class="qty-control">
                        <button onclick="changeCartQty('${item.id}', -1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="changeCartQty('${item.id}', 1)">+</button>
                        <button onclick="removeFromCart('${item.id}')" style="background:none;border:none;color:#f87171;padding:0 4px;"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            `).join('');
            updatePosTotal();
        }

        function changeCartQty(productId, delta) {
            const item = state.posCart.find(i => i.id === productId);
            if (!item) return;
            item.qty = Math.max(1, item.qty + delta);
            if (item.qty === 0) {
                state.posCart = state.posCart.filter(i => i.id !== productId);
            }
            renderPosCart();
        }

        function removeFromCart(productId) {
            state.posCart = state.posCart.filter(i => i.id !== productId);
            renderPosCart();
        }

        function clearPosCart() {
            if (state.posCart.length === 0) return;
            if (confirm('Səbəti təmizləmək istədiyinizə əminsiniz?')) {
                state.posCart = [];
                renderPosCart();
                toast('Səbət təmizləndi!');
            }
        }

        function updatePosTotal() {
            const discount = parseFloat(document.getElementById('posDiscount')?.value) || 0;
            const total = state.posCart.reduce((sum, item) => sum + (item.sellPrice || 0) * item.qty, 0);
            const finalTotal = Math.max(0, total - discount);
            document.getElementById('posTotal').textContent = fmtMoney(finalTotal);
            document.getElementById('posDiscountDisplay').textContent = fmtMoney(discount);
        }

        function completeSale() {
            if (state.posCart.length === 0) { toast('Səbət boşdur!', 'warning'); return; }
            const total = state.posCart.reduce((sum, item) => sum + (item.sellPrice || 0) * item.qty, 0);
            const discount = parseFloat(document.getElementById('posDiscount')?.value) || 0;
            const finalTotal = Math.max(0, total - discount);
            const method = document.getElementById('posPaymentMethod')?.value || 'nağd';

            const sale = {
                id: 'sale_' + randId(),
                items: state.posCart.map(item => ({ ...item })),
                total: finalTotal,
                discount: discount,
                method: method,
                date: now(),
                timestamp: Date.now(),
            };

            const products = getProducts();
            state.posCart.forEach(cartItem => {
                const prod = products.find(p => p.id === cartItem.id);
                if (prod) {
                    prod.stock = Math.max(0, (prod.stock || 0) - cartItem.qty);
                }
            });
            setProducts(products);

            const sales = getSales();
            sales.push(sale);
            setSales(sales);

            const finance = getFinance();
            finance.push({
                id: 'fin_' + randId(),
                type: 'income',
                category: 'satış',
                amount: finalTotal,
                note: `Satış #${sale.id}`,
                date: today(),
            });
            setFinance(finance);

            toast(`Satış tamamlandı! Cəmi: ${fmtMoney(finalTotal)}`, 'success');
            state.posCart = [];
            renderPosCart();
            renderDashboard();
            renderFinance();
        }

        function printReceipt() {
            if (state.posCart.length === 0) { toast('Səbət boşdur!', 'warning'); return; }
            const total = state.posCart.reduce((sum, item) => sum + (item.sellPrice || 0) * item.qty, 0);
            const discount = parseFloat(document.getElementById('posDiscount')?.value) || 0;
            const finalTotal = Math.max(0, total - discount);
            let receipt = '=== 366 AUTO ===\n';
            receipt += `Tarix: ${now()}\n`;
            receipt += '---\n';
            state.posCart.forEach(item => {
                receipt += `${item.name} x${item.qty} = ${fmtMoney((item.sellPrice || 0) * item.qty)}\n`;
            });
            receipt += '---\n';
            receipt += `Cəmi: ${fmtMoney(total)}\n`;
            receipt += `Endirim: ${fmtMoney(discount)}\n`;
            receipt += `Ödəniləcək: ${fmtMoney(finalTotal)}\n`;
            receipt += '=== Xoş gəldiniz ===\n';
            alert(receipt);
        }


        // ===== CRUD FUNKSİYALARI =====
        function openProductModal(editId) {
            document.getElementById('productForm').reset();
            document.getElementById('productId').value = '';
            document.getElementById('productModalTitle').textContent = 'Məhsul əlavə et';
            if (editId) {
                const p = getProducts().find(pr => pr.id === editId);
                if (p) {
                    document.getElementById('productId').value = p.id;
                    document.getElementById('pName').value = p.name || '';
                    document.getElementById('pOem').value = p.oem || '';
                    document.getElementById('pCategory').value = p.category || '';
                    document.getElementById('pSubcategory').value = p.subcategory || '';
                    document.getElementById('pBrand').value = p.brand || '';
                    document.getElementById('pCode').value = p.code || '';
                    document.getElementById('pSku').value = p.sku || '';
                    document.getElementById('pBarcode').value = p.barcode || '';
                    document.getElementById('pCarBrand').value = p.carBrand || '';
                    document.getElementById('pCarModel').value = p.carModel || '';
                    document.getElementById('pCarYear').value = p.carYear || '';
                    document.getElementById('pEngine').value = p.engine || '';
                    document.getElementById('pCountry').value = p.country || '';
                    document.getElementById('pSupplier').value = p.supplier || '';
                    document.getElementById('pBuyPrice').value = p.buyPrice || '';
                    document.getElementById('pSellPrice').value = p.sellPrice || '';
                    document.getElementById('pMinPrice').value = p.minPrice || '';
                    document.getElementById('pDiscount').value = p.discount || 0;
                    document.getElementById('pStock').value = p.stock || 0;
                    document.getElementById('pMinStock').value = p.minStock || 5;
                    document.getElementById('pWarehouse').value = p.warehouse || '';
                    document.getElementById('pShelf').value = p.shelf || '';
                    document.getElementById('pNote').value = p.note || '';
                    document.getElementById('pImage').value = p.image || '';
                    document.getElementById('productModalTitle').textContent = 'Məhsulu redaktə et';
                    calcProfit();
                }
            }
            openModal('productModal');
        }

        function editProduct(id) { openProductModal(id); }

        function saveProduct() {
            const id = document.getElementById('productId').value;
            const data = {
                id: id || 'p_' + randId(),
                name: document.getElementById('pName').value,
                oem: document.getElementById('pOem').value,
                category: document.getElementById('pCategory').value,
                subcategory: document.getElementById('pSubcategory').value,
                brand: document.getElementById('pBrand').value,
                code: document.getElementById('pCode').value,
                sku: document.getElementById('pSku').value,
                barcode: document.getElementById('pBarcode').value,
                carBrand: document.getElementById('pCarBrand').value,
                carModel: document.getElementById('pCarModel').value,
                carYear: document.getElementById('pCarYear').value,
                engine: document.getElementById('pEngine').value,
                country: document.getElementById('pCountry').value,
                supplier: document.getElementById('pSupplier').value,
                buyPrice: parseFloat(document.getElementById('pBuyPrice').value) || 0,
                sellPrice: parseFloat(document.getElementById('pSellPrice').value) || 0,
                minPrice: parseFloat(document.getElementById('pMinPrice').value) || 0,
                discount: parseFloat(document.getElementById('pDiscount').value) || 0,
                stock: parseInt(document.getElementById('pStock').value) || 0,
                minStock: parseInt(document.getElementById('pMinStock').value) || 5,
                warehouse: document.getElementById('pWarehouse').value,
                shelf: document.getElementById('pShelf').value,
                note: document.getElementById('pNote').value,
                image: document.getElementById('pImage').value,
            };
            let products = getProducts();
            if (id) {
                const idx = products.findIndex(p => p.id === id);
                if (idx > -1) products[idx] = { ...products[idx], ...data };
            } else {
                products.push(data);
            }
            setProducts(products);
            closeModal('productModal');
            renderProducts();
            toast('Məhsul yadda saxlandı!');
        }

        function deleteProduct(id) {
            if (confirm('Məhsulu silmək istədiyinizə əminsiniz?')) {
                const products = getProducts().filter(p => p.id !== id);
                setProducts(products);
                renderProducts();
                toast('Məhsul silindi!');
            }
        }

        function generateBarcode(id) {
            const p = getProducts().find(pr => pr.id === id);
            if (!p) { toast('Məhsul tapılmadı!', 'danger'); return; }
            const barcode = p.barcode || p.code || p.oem || p.id;
            toast(`Barkod: ${barcode} (klipboard-a kopyalandı)`);
            navigator.clipboard?.writeText(barcode);
        }

        function calcProfit() {
            const buy = parseFloat(document.getElementById('pBuyPrice').value) || 0;
            const sell = parseFloat(document.getElementById('pSellPrice').value) || 0;
            if (buy > 0 && sell > 0) {
                const profit = ((sell - buy) / buy * 100).toFixed(1);
                document.getElementById('pProfit').value = profit + '%';
            } else {
                document.getElementById('pProfit').value = '—';
            }
        }

        function exportProducts() {
            const products = getProducts();
            if (products.length === 0) { toast('Məhsul yoxdur!', 'warning'); return; }
            const csv = ['Ad,OEM,Kateqoriya,Stok,Alış,Satış,Marka,Model,İl']
                .concat(products.map(p =>
                    `"${p.name||''}","${p.oem||''}","${p.category||''}",${p.stock||0},${p.buyPrice||0},${p.sellPrice||0},"${p.carBrand||''}","${p.carModel||''}","${p.carYear||''}"`
                )).join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'məhsullar.csv';
            link.click();
            toast('Export edildi!');
        }

        function importProducts(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const text = e.target.result;
                    const lines = text.split('\n').filter(l => l.trim());
                    if (lines.length < 2) { toast('Fayl boşdur!', 'warning'); return; }
                    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
                    const products = getProducts();
                    for (let i = 1; i < lines.length; i++) {
                        const vals = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
                        const p = {};
                        headers.forEach((h, idx) => {
                            if (h === 'Ad' || h === 'name') p.name = vals[idx] || '';
                            else if (h === 'OEM') p.oem = vals[idx] || '';
                            else if (h === 'Kateqoriya' || h === 'category') p.category = vals[idx] || '';
                            else if (h === 'Stok' || h === 'stock') p.stock = parseInt(vals[idx]) || 0;
                            else if (h === 'Alış' || h === 'buyPrice') p.buyPrice = parseFloat(vals[idx]) || 0;
                            else if (h === 'Satış' || h === 'sellPrice') p.sellPrice = parseFloat(vals[idx]) || 0;
                            else if (h === 'Marka' || h === 'carBrand') p.carBrand = vals[idx] || '';
                            else if (h === 'Model' || h === 'carModel') p.carModel = vals[idx] || '';
                            else if (h === 'İl' || h === 'carYear') p.carYear = vals[idx] || '';
                        });
                        if (p.name) {
                            p.id = 'p_' + randId();
                            products.push(p);
                        }
                    }
                    setProducts(products);
                    renderProducts();
                    toast(`${products.length} məhsul import edildi!`);
                } catch (err) { toast('Xəta: ' + err.message, 'danger'); }
            };
            reader.readAsText(file);
            event.target.value = '';
        }

        // ===== SUPPLIER CRUD =====
        function openSupplierModal(editId) {
            document.getElementById('supplierForm').reset();
            document.getElementById('supplierId').value = '';
            document.getElementById('supplierModalTitle').textContent = 'Təchizatçı əlavə et';
            if (editId) {
                const s = getSuppliers().find(sup => sup.id === editId);
                if (s) {
                    document.getElementById('supplierId').value = s.id;
                    document.getElementById('sName').value = s.name || '';
                    document.getElementById('sPhone').value = s.phone || '';
                    document.getElementById('sWhatsapp').value = s.whatsapp || '';
                    document.getElementById('sEmail').value = s.email || '';
                    document.getElementById('sAddress').value = s.address || '';
                    document.getElementById('sVoen').value = s.voen || '';
                    document.getElementById('sBank').value = s.bank || '';
                    document.getElementById('sNote').value = s.note || '';
                    document.getElementById('supplierModalTitle').textContent = 'Təchizatçını redaktə et';
                }
            }
            openModal('supplierModal');
        }

        function editSupplier(id) { openSupplierModal(id); }

        function saveSupplier() {
            const id = document.getElementById('supplierId').value;
            const data = {
                id: id || 's_' + randId(),
                name: document.getElementById('sName').value,
                phone: document.getElementById('sPhone').value,
                whatsapp: document.getElementById('sWhatsapp').value,
                email: document.getElementById('sEmail').value,
                address: document.getElementById('sAddress').value,
                voen: document.getElementById('sVoen').value,
                bank: document.getElementById('sBank').value,
                note: document.getElementById('sNote').value,
                debt: 0,
            };
            let suppliers = getSuppliers();
            if (id) {
                const idx = suppliers.findIndex(s => s.id === id);
                if (idx > -1) suppliers[idx] = { ...suppliers[idx], ...data };
            } else {
                suppliers.push(data);
            }
            setSuppliers(suppliers);
            closeModal('supplierModal');
            renderSuppliers();
            toast('Təchizatçı yadda saxlandı!');
        }

        function deleteSupplier(id) {
            if (confirm('Təchizatçını silmək istədiyinizə əminsiniz?')) {
                const suppliers = getSuppliers().filter(s => s.id !== id);
                setSuppliers(suppliers);
                renderSuppliers();
                toast('Təchizatçı silindi!');
            }
        }

        // ===== PURCHASE CRUD =====
        let purchaseItems = [];

        function openPurchaseModal() {
            document.getElementById('purchaseForm').reset();
            purchaseItems = [];
            renderPurchaseItems();
            calcPurchaseTotal();
            populatePurchaseSelects();
            openModal('purchaseModal');
        }

        function populatePurchaseSelects() {
            const supSelect = document.getElementById('purSupplier');
            if (supSelect) {
                const suppliers = getSuppliers();
                supSelect.innerHTML = '<option value="">Təchizatçı seçin</option>' +
                    suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
            }
            const prodSelect = document.getElementById('purProduct');
            if (prodSelect) {
                const products = getProducts();
                prodSelect.innerHTML = '<option value="">Məhsul seçin</option>' +
                    products.map(p => `<option value="${p.id}">${p.name} (${p.oem || ''})</option>`).join('');
            }
        }

        function addPurchaseItem() {
            const productId = document.getElementById('purProduct').value;
            const qty = parseInt(document.getElementById('purQty').value) || 1;
            const price = parseFloat(document.getElementById('purPrice').value) || 0;
            if (!productId) { toast('Məhsul seçin!', 'warning'); return; }
            if (qty < 1) { toast('Miqdar düzgün deyil!', 'warning'); return; }
            const product = getProducts().find(p => p.id === productId);
            if (!product) { toast('Məhsul tapılmadı!', 'danger'); return; }
            purchaseItems.push({
                productId: product.id,
                name: product.name,
                qty: qty,
                price: price,
                total: qty * price
            });
            renderPurchaseItems();
            calcPurchaseTotal();
            toast('Məhsul əlavə edildi!');
        }

        function removePurchaseItem(index) {
            purchaseItems.splice(index, 1);
            renderPurchaseItems();
            calcPurchaseTotal();
        }

        function renderPurchaseItems() {
            const tbody = document.getElementById('purchaseItemsBody');
            if (!tbody) return;
            if (purchaseItems.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Heç bir məhsul əlavə edilməyib</td></tr>`;
                return;
            }
            tbody.innerHTML = purchaseItems.map((item, idx) => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td>${fmtMoney(item.price)}</td>
                    <td>${fmtMoney(item.total)}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="removePurchaseItem(${idx})"><i class="fas fa-times"></i></button></td>
                </tr>
            `).join('');
        }

        function calcPurchaseTotal() {
            const tax = parseFloat(document.getElementById('purTax').value) || 0;
            const discount = parseFloat(document.getElementById('purDiscount').value) || 0;
            const shipping = parseFloat(document.getElementById('purShipping').value) || 0;
            const other = parseFloat(document.getElementById('purOther').value) || 0;
            const subtotal = purchaseItems.reduce((sum, item) => sum + item.total, 0);
            const total = subtotal + (subtotal * tax / 100) - discount + shipping + other;
            document.getElementById('purTotalDisplay').textContent = fmtMoney(total);
            return total;
        }

        function completePurchase(e) {
            e.preventDefault();
            if (purchaseItems.length === 0) { toast('Heç bir məhsul əlavə edilməyib!', 'warning'); return; }
            const supplierId = document.getElementById('purSupplier').value;
            const supplier = getSuppliers().find(s => s.id === supplierId);
            const total = calcPurchaseTotal();

            const purchase = {
                id: 'pur_' + randId(),
                supplier: supplier?.name || 'Bilinməyən',
                supplierId: supplierId || '',
                items: [...purchaseItems],
                total: total,
                tax: parseFloat(document.getElementById('purTax').value) || 0,
                discount: parseFloat(document.getElementById('purDiscount').value) || 0,
                shipping: parseFloat(document.getElementById('purShipping').value) || 0,
                other: parseFloat(document.getElementById('purOther').value) || 0,
                date: today(),
                status: 'tamamlandı',
            };

            const products = getProducts();
            purchaseItems.forEach(item => {
                const prod = products.find(p => p.id === item.productId);
                if (prod) {
                    prod.stock = (prod.stock || 0) + item.qty;
                    if (item.price > 0) prod.buyPrice = item.price;
                }
            });
            setProducts(products);

            const purchases = getPurchases();
            purchases.push(purchase);
            setPurchases(purchases);

            purchaseItems = [];
            closeModal('purchaseModal');
            renderPurchases();
            toast('Alış tamamlandı!');
        }

        function viewPurchase(id) {
            const purchase = getPurchases().find(p => p.id === id);
            if (!purchase) { toast('Alış tapılmadı!', 'danger'); return; }
            let msg = `=== Alış #${purchase.id} ===\n`;
            msg += `Təchizatçı: ${purchase.supplier}\n`;
            msg += `Tarix: ${purchase.date}\n`;
            msg += '---\n';
            purchase.items.forEach(item => {
                msg += `${item.name} x${item.qty} = ${fmtMoney(item.total)}\n`;
            });
            msg += '---\n';
            msg += `Cəmi: ${fmtMoney(purchase.total)}\n`;
            msg += `ƏDV: ${purchase.tax || 0}%\n`;
            msg += `Endirim: ${fmtMoney(purchase.discount || 0)}\n`;
            msg += `Daşıma: ${fmtMoney(purchase.shipping || 0)}\n`;
            msg += `Digər: ${fmtMoney(purchase.other || 0)}\n`;
            alert(msg);
        }

        // ===== FINANCE CRUD =====
        function openIncomeModal() { openModal('incomeModal'); }

        function addIncome(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('incAmount').value) || 0;
            if (amount <= 0) { toast('Məbləğ daxil edin!', 'warning'); return; }
            const finance = getFinance();
            finance.push({
                id: 'fin_' + randId(),
                type: 'income',
                category: document.getElementById('incCategory').value,
                amount: amount,
                note: document.getElementById('incNote').value,
                date: today(),
            });
            setFinance(finance);
            closeModal('incomeModal');
            renderFinance();
            toast('Gəlir əlavə edildi!');
        }

        function openExpenseModal() { openModal('expenseModal'); }

        function addExpense(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('expAmount').value) || 0;
            if (amount <= 0) { toast('Məbləğ daxil edin!', 'warning'); return; }
            const finance = getFinance();
            finance.push({
                id: 'fin_' + randId(),
                type: 'expense',
                category: document.getElementById('expCategory').value,
                amount: amount,
                note: document.getElementById('expNote').value,
                date: today(),
            });
            setFinance(finance);
            closeModal('expenseModal');
            renderFinance();
            toast('Xərc əlavə edildi!');
        }

        // ===== EMPLOYEE CRUD =====
        function openEmployeeModal(editId) {
            document.getElementById('employeeForm').reset();
            document.getElementById('employeeId').value = '';
            document.getElementById('employeeModalTitle').textContent = 'İşçi əlavə et';
            if (editId) {
                const e = getEmployees().find(emp => emp.id === editId);
                if (e) {
                    document.getElementById('employeeId').value = e.id;
                    document.getElementById('eName').value = e.name || '';
                    document.getElementById('eSurname').value = e.surname || '';
                    document.getElementById('ePosition').value = e.position || '';
                    document.getElementById('ePhone').value = e.phone || '';
                    document.getElementById('eSalary').value = e.salary || '';
                    document.getElementById('eBonus').value = e.bonus || 0;
                    document.getElementById('eHireDate').value = e.hireDate || '';
                    document.getElementById('employeeModalTitle').textContent = 'İşçini redaktə et';
                }
            }
            openModal('employeeModal');
        }

        function editEmployee(id) { openEmployeeModal(id); }

        function saveEmployee(e) {
            e.preventDefault();
            const id = document.getElementById('employeeId').value;
            const data = {
                id: id || 'e_' + randId(),
                name: document.getElementById('eName').value,
                surname: document.getElementById('eSurname').value,
                position: document.getElementById('ePosition').value,
                phone: document.getElementById('ePhone').value,
                salary: parseFloat(document.getElementById('eSalary').value) || 0,
                bonus: parseFloat(document.getElementById('eBonus').value) || 0,
                hireDate: document.getElementById('eHireDate').value || today(),
            };
            let employees = getEmployees();
            if (id) {
                const idx = employees.findIndex(e => e.id === id);
                if (idx > -1) employees[idx] = { ...employees[idx], ...data };
            } else {
                employees.push(data);
            }
            setEmployees(employees);
            closeModal('employeeModal');
            renderEmployees();
            toast('İşçi yadda saxlandı!');
        }

        function deleteEmployee(id) {
            if (confirm('İşçini silmək istədiyinizə əminsiniz?')) {
                const employees = getEmployees().filter(e => e.id !== id);
                setEmployees(employees);
                renderEmployees();
                toast('İşçi silindi!');
            }
        }

        function paySalary(id) {
            const emp = getEmployees().find(e => e.id === id);
            if (!emp) { toast('İşçi tapılmadı!', 'danger'); return; }
            const amount = (emp.salary || 0) + (emp.bonus || 0);
            if (amount <= 0) { toast('Maaş 0-dır!', 'warning'); return; }
            const finance = getFinance();
            finance.push({
                id: 'fin_' + randId(),
                type: 'expense',
                category: 'əməkhaqqı',
                amount: amount,
                note: `${emp.name} üçün maaş`,
                date: today(),
            });
            setFinance(finance);
            toast(`${emp.name} üçün ${fmtMoney(amount)} maaş ödənildi!`);
            renderFinance();
        }

        // ===== TAX CRUD =====
        function openTaxPaymentModal() {
            document.getElementById('taxForm').reset();
            document.getElementById('taxDate').value = today();
            openModal('taxModal');
        }

        function saveTaxPayment(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('taxAmount').value) || 0;
            if (amount <= 0) { toast('Məbləğ daxil edin!', 'warning'); return; }
            const taxes = getTaxes();
            taxes.push({
                id: 'tax_' + randId(),
                quarter: document.getElementById('taxQuarter').value,
                amount: amount,
                date: document.getElementById('taxDate').value || today(),
                status: document.getElementById('taxStatus').value,
                note: document.getElementById('taxNote').value,
            });
            setTaxes(taxes);
            closeModal('taxModal');
            renderTaxes();
            toast('Vergi ödənişi yadda saxlandı!');
        }

        // ===== DEBT CRUD =====
        function openDebtModal(editId) {
            document.getElementById('debtForm').reset();
            document.getElementById('debtId').value = '';
            if (editId) {
                const d = getDebts().find(debt => debt.id === editId);
                if (d) {
                    document.getElementById('debtId').value = d.id;
                    document.getElementById('debtType').value = d.type || 'borcluyuq';
                    document.getElementById('debtPerson').value = d.person || '';
                    document.getElementById('debtTotal').value = d.total || 0;
                    document.getElementById('debtPaid').value = d.paid || 0;
                    document.getElementById('debtDue').value = d.due || '';
                    document.getElementById('debtStatus').value = d.status || 'aktiv';
                    document.getElementById('debtNote').value = d.note || '';
                }
            }
            openModal('debtModal');
        }

        function editDebt(id) { openDebtModal(id); }

        function saveDebt(e) {
            e.preventDefault();
            const id = document.getElementById('debtId').value;
            const data = {
                id: id || 'd_' + randId(),
                type: document.getElementById('debtType').value,
                person: document.getElementById('debtPerson').value,
                total: parseFloat(document.getElementById('debtTotal').value) || 0,
                paid: parseFloat(document.getElementById('debtPaid').value) || 0,
                due: document.getElementById('debtDue').value || '',
                status: document.getElementById('debtStatus').value,
                note: document.getElementById('debtNote').value,
            };
            let debts = getDebts();
            if (id) {
                const idx = debts.findIndex(d => d.id === id);
                if (idx > -1) debts[idx] = { ...debts[idx], ...data };
            } else {
                debts.push(data);
            }
            setDebts(debts);
            closeModal('debtModal');
            renderDebts();
            toast('Borc yadda saxlandı!');
        }

        function payDebt(id) {
            const debt = getDebts().find(d => d.id === id);
            if (!debt) { toast('Borc tapılmadı!', 'danger'); return; }
            const remaining = (debt.total || 0) - (debt.paid || 0);
            if (remaining <= 0) { toast('Bu borc artıq bağlanıb!', 'warning'); return; }
            const amount = prompt(`Ödəniləcək məbləğ (qalan: ${fmtMoney(remaining)}):`, remaining);
            if (amount === null) return;
            const val = parseFloat(amount);
            if (isNaN(val) || val <= 0) { toast('Düzgün məbləğ daxil edin!', 'warning'); return; }
            const payAmount = Math.min(val, remaining);
            debt.paid = (debt.paid || 0) + payAmount;
            if ((debt.total || 0) - (debt.paid || 0) <= 0) {
                debt.status = 'bağlandı';
            }
            const debts = getDebts();
            const idx = debts.findIndex(d => d.id === id);
            if (idx > -1) debts[idx] = debt;
            setDebts(debts);
            renderDebts();
            toast(`${fmtMoney(payAmount)} ödənildi!`);
        }

        // ===== CUSTOMER CRUD =====
        function openCustomerModal(editId) {
            document.getElementById('customerForm').reset();
            document.getElementById('customerId').value = '';
            document.getElementById('customerModalTitle').textContent = 'Müştəri əlavə et';
            if (editId) {
                const c = getCustomers().find(cust => cust.id === editId);
                if (c) {
                    document.getElementById('customerId').value = c.id;
                    document.getElementById('cName').value = c.name || '';
                    document.getElementById('cPhone').value = c.phone || '';
                    document.getElementById('cWhatsapp').value = c.whatsapp || '';
                    document.getElementById('cEmail').value = c.email || '';
                    document.getElementById('cCarBrand').value = c.carBrand || '';
                    document.getElementById('cCarModel').value = c.carModel || '';
                    document.getElementById('cPlate').value = c.plate || '';
                    document.getElementById('cNote').value = c.note || '';
                    document.getElementById('customerModalTitle').textContent = 'Müştərini redaktə et';
                }
            }
            openModal('customerModal');
        }

        function editCustomer(id) { openCustomerModal(id); }

        function saveCustomer(e) {
            e.preventDefault();
            const id = document.getElementById('customerId').value;
            const data = {
                id: id || 'c_' + randId(),
                name: document.getElementById('cName').value,
                phone: document.getElementById('cPhone').value,
                whatsapp: document.getElementById('cWhatsapp').value,
                email: document.getElementById('cEmail').value,
                carBrand: document.getElementById('cCarBrand').value,
                carModel: document.getElementById('cCarModel').value,
                plate: document.getElementById('cPlate').value,
                note: document.getElementById('cNote').value,
                debt: 0,
            };
            let customers = getCustomers();
            if (id) {
                const idx = customers.findIndex(c => c.id === id);
                if (idx > -1) customers[idx] = { ...customers[idx], ...data };
            } else {
                customers.push(data);
            }
            setCustomers(customers);
            closeModal('customerModal');
            renderCustomers();
            toast('Müştəri yadda saxlandı!');
        }

        function deleteCustomer(id) {
            if (confirm('Müştərini silmək istədiyinizə əminsiniz?')) {
                const customers = getCustomers().filter(c => c.id !== id);
                setCustomers(customers);
                renderCustomers();
                toast('Müştəri silindi!');
            }
        }

        // ===== REPORT =====
        function generateReport() {
            const start = document.getElementById('reportStart').value;
            const end = document.getElementById('reportEnd').value;
            if (!start || !end) { toast('Tarix seçin!', 'warning'); return; }
            const sales = getSales().filter(s => s.date >= start && s.date <= end);
            const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
            const container = document.getElementById('reportContent');
            container.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;margin-bottom:1rem;">
                    <div class="stat-card"><div class="stat-label">Dövr</div><div class="stat-value" style="font-size:0.9rem;">${start} - ${end}</div></div>
                    <div class="stat-card"><div class="stat-label">Satış</div><div class="stat-value success">${fmtMoney(totalSales)}</div></div>
                    <div class="stat-card"><div class="stat-label">Satış sayı</div><div class="stat-value">${sales.length}</div></div>
                </div>
                <div><h5 style="color:var(--surface-text-secondary);font-weight:500;font-size:0.8rem;text-transform:uppercase;">Satışlar</h5>
                    ${sales.length === 0 ? '<p class="text-muted">Heç bir satış yoxdur</p>' :
                    sales.slice(0, 20).map(s => `<div class="flex-between" style="padding:0.2rem 0;border-bottom:1px solid rgba(255,255,255,0.04);"><span>${s.date}</span><span>${fmtMoney(s.total)}</span></div>`).join('')}
                </div>
            `;
            toast('Hesabat yaradıldı!');
        }

        function exportReportExcel() {
            toast('Excel export hazırlanır...');
        }

        function populateSelects() {
            const supplierList = document.getElementById('supplierList');
            if (supplierList) {
                const suppliers = getSuppliers();
                supplierList.innerHTML = suppliers.map(s => `<option value="${s.name}">`).join('');
            }
            const catList = document.getElementById('catList');
            if (catList) {
                const cats = [...new Set(getProducts().map(p => p.category).filter(Boolean))];
                catList.innerHTML = cats.map(c => `<option value="${c}">`).join('');
            }
        }

        function autoBackup() {
            try {
                const backup = {
                    products: getProducts(),
                    suppliers: getSuppliers(),
                    purchases: getPurchases(),
                    sales: getSales(),
                    finance: getFinance(),
                    employees: getEmployees(),
                    taxes: getTaxes(),
                    debts: getDebts(),
                    customers: getCustomers(),
                    timestamp: new Date().toISOString(),
                };
                localStorage.setItem('autoparts_backup', JSON.stringify(backup));
            } catch (e) { /* ignore */ }
        }

        function sendWhatsAppInquiry(vin) {
            const message = `Salam! Mən ${vin} VIN-li avtomobil üçün ehtiyat hissə axtarıram. Zəhmət olmasa mənə kömək edə bilərsinizmi?`;
            const url = `https://api.whatsapp.com/send?phone=+994501234567&text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }

        function searchManual(vin) {
            navigateTo('products');
            setTimeout(() => {
                const searchInput = document.getElementById('productSearch');
                if (searchInput) {
                    searchInput.value = vin;
                    searchInput.dispatchEvent(new Event('input'));
                }
            }, 300);
        }

        function addToCartFromSearch(productId) {
            addToCart(productId);
            toast('Məhsul səbətə əlavə edildi!', 'success');
            setTimeout(() => {
                const salesBtn = document.querySelector('.nav-item[data-page="sales"]');
                if (salesBtn) salesBtn.click();
            }, 600);
        }


        // ===== INIT =====
        function initApp() {
            // Məhsulları yüklə — kataloq versiyası dəyişibsə (yeni marka bazası) yenidən yarat
            const CATALOG_VERSION = '2'; // v2 = 61 marka / 156 model
            state.products = loadFromStorage('products');
            const catalogV = localStorage.getItem('autoparts_catalog_v');
            if (state.products.length === 0 || state.products.length < 300 || catalogV !== CATALOG_VERSION) {
                state.products = generateSampleProducts();
                saveToStorage('products', state.products);
                localStorage.setItem('autoparts_catalog_v', CATALOG_VERSION);
            }

            state.suppliers = loadFromStorage('suppliers');
            state.purchases = loadFromStorage('purchases');
            state.sales = loadFromStorage('sales');
            state.finance = loadFromStorage('finance');
            state.employees = loadFromStorage('employees');
            state.taxes = loadFromStorage('taxes');
            state.debts = loadFromStorage('debts');
            state.customers = loadFromStorage('customers');

            if (state.suppliers.length === 0) {
                state.suppliers = [
                    { id: 's1', name: 'AutoParts AZ', phone: '+994501234567', email: 'info@autoparts.az',
                    address: 'Bakı, Nəsimi' },
                    { id: 's2', name: 'Premium Parts', phone: '+994502345678', email: 'info@premium.az',
                    address: 'Sumqayıt' },
                ];
                saveToStorage('suppliers', state.suppliers);
            }

            document.getElementById('userName').textContent = state.user.name;
            document.getElementById('userAvatar').textContent = state.user.name[0].toUpperCase();

            applyRolePermissions();
            renderDashboard();
            renderProducts();
            renderSuppliers();
            renderPurchases();
            renderFinance();
            renderEmployees();
            renderTaxes();
            renderDebts();
            renderCustomers();
            renderPosProducts();
            populateSelects();
            populateManualSelects();

            document.getElementById('dashboardDate').textContent = 'Bugün: ' + new Date().toLocaleDateString('az-AZ', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            setupEventListeners();
            setInterval(autoBackup, 60000);

            if (localStorage.getItem('autoparts_kiosk') === '1') {
                document.body.classList.add('kiosk-mode');
                navigateTo('sales');
                const btn = document.getElementById('kioskToggleBtn');
                if (btn) btn.innerHTML = '<i class="fas fa-compress"></i> Kassa rejimindən çıx';
            }
        }

        function applyRolePermissions() {
            document.querySelectorAll('.nav-item[data-page]').forEach(el => { el.style.display = ''; });
            document.querySelectorAll('.page').forEach(el => { el.style.display = ''; });
        }

        function setupEventListeners() {
            document.getElementById('logoutBtn').addEventListener('click', function() {
                if (confirm('Çıxış etmək istədiyinizə əminsiniz?')) {
                    localStorage.clear();
                    window.location.reload();
                }
            });

            document.querySelectorAll('.nav-item[data-page]').forEach(el => {
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    const page = this.dataset.page;
                    navigateTo(page);
                    document.getElementById('mobileSidebar').classList.remove('open');
                });
            });

            document.querySelectorAll('.mobile-sidebar .nav-item[data-page]').forEach(el => {
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    const page = this.dataset.page;
                    navigateTo(page);
                    document.getElementById('mobileSidebar').classList.remove('open');
                });
            });

            document.getElementById('hamburgerBtn').addEventListener('click', function() {
                document.getElementById('mobileSidebar').classList.toggle('open');
            });

            document.getElementById('themeToggle').addEventListener('click', function() {
                document.body.classList.toggle('dark');
                const isDark = document.body.classList.contains('dark');
                localStorage.setItem('autoparts_theme', isDark ? 'dark' : 'light');
                this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            });

            document.getElementById('heroVinBtn').addEventListener('click', function() {
                navigateTo('vin-search');
                setTimeout(() => document.getElementById('vinInput')?.focus(), 300);
            });

            document.getElementById('vinSearchBtn').addEventListener('click', function(e) {
                e.preventDefault();
                performSearch();
            });

            const vinInput = document.getElementById('vinInput');
            if (vinInput) {
                vinInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        performSearch();
                    }
                });
            }

            // Bütün formalar üçün event listener-lər
            document.getElementById('productForm').addEventListener('submit', function(e) { e.preventDefault();
                saveProduct(); });
            document.getElementById('supplierForm').addEventListener('submit', function(e) { e.preventDefault();
                saveSupplier(); });
            document.getElementById('purchaseForm').addEventListener('submit', function(e) { e.preventDefault();
                completePurchase(e); });
            document.getElementById('employeeForm').addEventListener('submit', function(e) { e.preventDefault();
                saveEmployee(e); });
            document.getElementById('customerForm').addEventListener('submit', function(e) { e.preventDefault();
                saveCustomer(e); });
            document.getElementById('incomeForm').addEventListener('submit', function(e) { e.preventDefault();
                addIncome(e); });
            document.getElementById('expenseForm').addEventListener('submit', function(e) { e.preventDefault();
                addExpense(e); });
            document.getElementById('taxForm').addEventListener('submit', function(e) { e.preventDefault();
                saveTaxPayment(e); });
            document.getElementById('debtForm').addEventListener('submit', function(e) { e.preventDefault();
                saveDebt(e); });

            document.querySelectorAll('.modal-overlay').forEach(el => {
                el.addEventListener('click', function(e) {
                    if (e.target === this) this.classList.remove('active');
                });
            });

            const d = new Date();
            document.getElementById('reportEnd').value = today();
            const start = new Date(d);
            start.setDate(d.getDate() - 30);
            document.getElementById('reportStart').value = start.toISOString().split('T')[0];
        }

        function navigateTo(page) {
            document.querySelectorAll('.nav-item[data-page]').forEach(el => {
                el.classList.toggle('active', el.dataset.page === page);
            });
            document.querySelectorAll('.mobile-sidebar .nav-item[data-page]').forEach(el => {
                el.classList.toggle('active', el.dataset.page === page);
            });
            document.querySelectorAll('.page').forEach(el => {
                el.classList.toggle('active', el.id === 'page-' + page);
            });

            if (page === 'dashboard') renderDashboard();
            if (page === 'products') renderProducts();
            if (page === 'suppliers') renderSuppliers();
            if (page === 'purchases') renderPurchases();
            if (page === 'finance') renderFinance();
            if (page === 'employees') renderEmployees();
            if (page === 'taxes') renderTaxes();
            if (page === 'debts') renderDebts();
            if (page === 'customers') renderCustomers();
            if (page === 'sales') { renderPosProducts();
                renderPosCart(); }
            if (page === 'vin-search') {
                setTimeout(() => document.getElementById('vinInput')?.focus(), 200);
            }
        }

        function setVinExample(value) {
            document.getElementById('vinInput').value = value;
            performSearch();
        }


        // ===== SÜRƏTLİ SATIŞ (üzən düymə) & KASSA REJİMİ =====
        function goToSalesQuick() {
            navigateTo('sales');
            document.getElementById('mobileSidebar')?.classList.remove('open');
            document.getElementById('mainContent')?.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                document.getElementById('posModelFilter')?.focus();
                document.getElementById('posSearch')?.focus();
            }, 150);
        }

        function toggleKioskMode() {
            const isKiosk = document.body.classList.toggle('kiosk-mode');
            const btn = document.getElementById('kioskToggleBtn');
            if (isKiosk) {
                navigateTo('sales');
                if (btn) btn.innerHTML = '<i class="fas fa-compress"></i> Kassa rejimindən çıx';
                localStorage.setItem('autoparts_kiosk', '1');
                document.documentElement.requestFullscreen?.().catch(() => {/* icazə verilmədi, problem deyil */ });
                setTimeout(() => document.getElementById('posSearch')?.focus(), 200);
                toast('Kassa rejimi aktivdir — çıxmaq üçün yenidən düyməyə basın', 'success');
            } else {
                if (btn) btn.innerHTML = '<i class="fas fa-expand"></i> Kassa rejimi';
                localStorage.setItem('autoparts_kiosk', '0');
                if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
            }
        }
        window.goToSalesQuick = goToSalesQuick;
        window.toggleKioskMode = toggleKioskMode;

        function resetPosFilters() {
            ['posModelFilter', 'posMakeFilter', 'posYearFilter', 'posCategoryFilter'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
            const searchEl = document.getElementById('posSearch');
            if (searchEl) searchEl.value = '';
            renderPosProducts();
        }
        window.resetPosFilters = resetPosFilters;


        // ===== BOOT / PIN QORUMASI =====
        const CAR366_PIN = 'CAR366HA';

        function unlockApp() {
            document.getElementById('lockScreen').style.display = 'none';
            document.getElementById('app').style.display = '';
            initApp();
        }

        function checkLockPin() {
            const input = document.getElementById('lockPinInput');
            const errEl = document.getElementById('lockError');
            const val = input.value.trim().toUpperCase();
            if (val === CAR366_PIN) {
                sessionStorage.setItem('car366_unlocked', '1');
                errEl.classList.remove('show');
                unlockApp();
            } else {
                errEl.classList.add('show');
                input.value = '';
                input.focus();
            }
        }
        window.checkLockPin = checkLockPin;

        document.getElementById('lockPinInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') checkLockPin();
        });

        if (sessionStorage.getItem('car366_unlocked') === '1') {
            unlockApp();
        } else {
            setTimeout(() => document.getElementById('lockPinInput')?.focus(), 300);
        }

        // Qlobal funksiyalar
        window.openProductModal = openProductModal;
        window.editProduct = editProduct;
        window.deleteProduct = deleteProduct;
        window.generateBarcode = generateBarcode;
        window.exportProducts = exportProducts;
        window.importProducts = importProducts;
        window.prevProductPage = prevProductPage;
        window.nextProductPage = nextProductPage;
        window.renderProducts = renderProducts;
        window.openSupplierModal = openSupplierModal;
        window.editSupplier = editSupplier;
        window.deleteSupplier = deleteSupplier;
        window.renderSuppliers = renderSuppliers;
        window.openPurchaseModal = openPurchaseModal;
        window.addPurchaseItem = addPurchaseItem;
        window.removePurchaseItem = removePurchaseItem;
        window.calcPurchaseTotal = calcPurchaseTotal;
        window.viewPurchase = viewPurchase;
        window.openIncomeModal = openIncomeModal;
        window.openExpenseModal = openExpenseModal;
        window.renderFinance = renderFinance;
        window.openEmployeeModal = openEmployeeModal;
        window.editEmployee = editEmployee;
        window.deleteEmployee = deleteEmployee;
        window.paySalary = paySalary;
        window.openTaxPaymentModal = openTaxPaymentModal;
        window.openDebtModal = openDebtModal;
        window.editDebt = editDebt;
        window.payDebt = payDebt;
        window.openCustomerModal = openCustomerModal;
        window.editCustomer = editCustomer;
        window.deleteCustomer = deleteCustomer;
        window.addToCart = addToCart;
        window.changeCartQty = changeCartQty;
        window.removeFromCart = removeFromCart;
        window.clearPosCart = clearPosCart;
        window.completeSale = completeSale;
        window.printReceipt = printReceipt;
        window.renderPosProducts = renderPosProducts;
        window.generateReport = generateReport;
        window.exportReportExcel = exportReportExcel;
        window.closeModal = closeModal;
        window.openModal = openModal;
        window.toast = toast;

        window.searchByVin = performSearch;
        window.performSearch = performSearch;
        window.addToCartFromSearch = addToCartFromSearch;
        window.setVinExample = setVinExample;
        window.sendWhatsAppInquiry = sendWhatsAppInquiry;
        window.searchManual = searchManual;
        window.searchByMakeModel = searchByMakeModel;

        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'B') {
                if (confirm('Backup bərpa etmək istədiyinizə əminsiniz? Cari məlumatlar itiriləcək.')) {
                    const raw = localStorage.getItem('autoparts_backup');
                    if (!raw) { toast('Backup tapılmadı!', 'warning'); return; }
                    try {
                        const data = JSON.parse(raw);
                        if (data.products) setProducts(data.products);
                        if (data.suppliers) setSuppliers(data.suppliers);
                        if (data.purchases) setPurchases(data.purchases);
                        if (data.sales) setSales(data.sales);
                        if (data.finance) setFinance(data.finance);
                        if (data.employees) setEmployees(data.employees);
                        if (data.taxes) setTaxes(data.taxes);
                        if (data.debts) setDebts(data.debts);
                        if (data.customers) setCustomers(data.customers);
                        toast('Backup bərpa edildi!');
                        location.reload();
                    } catch (err) { toast('Xəta: ' + err.message, 'danger'); }
                }
            }
        });

