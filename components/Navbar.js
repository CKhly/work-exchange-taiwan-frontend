import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <div className="container">
      <nav>
        <Link href="/">
          <a>
            <Image src="/picwish.png" width={75} height={72} />
          </a>
        </Link>
        <Link href="/">
          <a>
            <Image src="/name.png" width={110} height={72} />
          </a>
        </Link>
        <ul>
          <li><Link href="/create"><a>Create</a></Link></li>
          <li><Link href="/search"><a>Search</a></Link></li>
          <li><Link href="/profile"><a>Profile</a></Link></li>
        </ul>
      </nav>
    </div>
  )
}
