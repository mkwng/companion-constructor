import Link from "next/link";

export default function AdminMenu() {
	return (
		<>
			<div className="flex gap-4">
				<Link href="/admin/companions">
					<a>Companions</a>
				</Link>
				<Link href="/admin/transactions">
					<a>Transactions</a>
				</Link>
				<Link href="/admin/editor?admin=true">
					<a>Editor</a>
				</Link>
				<Link href="/admin/coupons">
					<a>Coupons</a>
				</Link>
			</div>
		</>
	);
}
