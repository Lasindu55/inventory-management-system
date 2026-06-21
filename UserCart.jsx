
.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #212529;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(0);
    transition: 0.3s;
}

.main-content {
    margin-left: 250px;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999;
}

@media (max-width: 768px) {

    .sidebar {
        transform: translateX(-100%);
        z-index: 1000;
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .main-content {
        margin-left: 0;
    }
}