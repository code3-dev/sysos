document.addEventListener('DOMContentLoaded', async () => {
    try {
        const info = await window.electronAPI.getSystemInfo();
        
        document.getElementById('arch').textContent = info.arch.toUpperCase();
        document.getElementById('platform').textContent = info.platform;
        document.getElementById('total-mem').textContent = `${(info.totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`;
        document.getElementById('free-mem').textContent = `${(info.freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`;
        document.getElementById('cpu-usage').textContent = `${info.cpuUsage.toFixed(2)}%`;
        document.getElementById('cpu-cores').textContent = info.cpuCores;
        document.getElementById('uptime').textContent = `${(info.uptime / 3600).toFixed(2)} hours`;
        document.getElementById('os-version').textContent = info.osVersion;
        document.getElementById('home-dir').textContent = info.homeDir;
        document.getElementById('user-info').textContent = info.userInfo;
        document.getElementById('gpu-info').textContent = info.gpuInfo;
        document.getElementById('cpu-info').textContent = info.cpuInfo;

        const storageContainer = document.getElementById('storage-info');
        storageContainer.innerHTML = info.storageInfo.map(disk => {
            const total = parseFloat(disk.total); 
            const free = parseFloat(disk.free); 
        
            if (isNaN(total) || isNaN(free) || total === 0) {
                return `<div class="bg-gray-700 p-4 rounded-lg shadow-md">
                    <strong class="text-gray-300">${disk.name}</strong> 
                    <span class="block text-sm text-gray-400">Invalid Data</span>
                </div>`;
            }
        
            const used = total - free;
            const usedPercentage = ((used / total) * 100).toFixed(2);
        
            return `
                <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                    <strong class="text-gray-300">${disk.name}:</strong> 
                    <span class="block text-sm text-gray-400">${total.toFixed(2)} GB (Free: ${free.toFixed(2)} GB)</span>
                    <div class="w-full bg-gray-600 rounded-full mt-2">
                        <div class="bg-blue-500 h-3 rounded-full transition-all" style="width: ${usedPercentage}%"></div>
                    </div>
                    <span class="block text-right text-xs text-gray-300 mt-1">${usedPercentage}% Used</span>
                </div>
            `;
        }).join('');        
    } catch (error) {
        console.error('Failed to fetch system info:', error);
    }
});
