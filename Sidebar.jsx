export default function DashboardCard({ title, value, color }) {
    return (
        <div className={`card shadow border-0 text-white bg-${color}`}>
            <div className="card-body">
                <h6 className="mb-2">{title}</h6>
                <h3 className="mb-0">{value}</h3>
            </div>
        </div>
    );
}