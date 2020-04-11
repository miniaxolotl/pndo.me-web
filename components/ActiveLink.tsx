import { useRouter } from 'next/router'

function ActiveLink({ children, href, clickFunc }: any) {
  const router = useRouter();
  const handleClick = e => {
	e.preventDefault();

	router.push(href);
}

  return (
	<a href={href} onClick={clickFunc ? clickFunc : handleClick}
	className={router.pathname === href ? 'active-link' : void(0)}>
      {children}
    </a>
  )
}

export default ActiveLink