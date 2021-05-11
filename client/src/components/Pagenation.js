import React from 'react'
import { Link } from 'react-router-dom';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';

export default function Pagenation({ page, perPage, count, path }) {
    if (page === undefined) {
        page = 1;
    }
    let totalpages = Math.ceil(count / perPage);
    let statrtloop = page;
    let diff = totalpages - page;
    if (diff <= 3) {
        statrtloop = totalpages - 3;
    }
    let endloop = statrtloop + 3;
    if (statrtloop <= 0) {
        statrtloop = 1;
    }
    const links = () => {
        const linkstore = [];
        for (let i = statrtloop; i <= endloop; i++) {
            linkstore.push(<li key={i}>
                <Link to={`/${path}/${i}`}>{i}</Link>
            </li>);
        }
        return linkstore;
    }
    const next = () => {
        if (page < totalpages) {
            return (
                <li><Link to={`/${path}/${+page + 1}`}><BsChevronDoubleRight /> </Link></li>
            )
        }
    }

    const prev = () => {
        if (page > 1) {
            return (
                <li><Link to={`/${path}/${+page - 1}`}><BsChevronDoubleLeft /> </Link></li>
            )
        }
    }



    return totalpages && count > 3 ? (
        <div className="pagination">
            {prev()}
            {links()}
            {next()}
        </div>
    ) : (
        ''
    );
}
