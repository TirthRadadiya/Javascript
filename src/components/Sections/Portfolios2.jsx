import React, { useState, useEffect } from "react";
import Portfolio2 from "../Items/Portfolio2";

const filters = [
  {
    id: 0,
    name: "All Projects",
  },
  {
    id: 1,
    name: "React",
  },
  {
    id: 2,
    name: "Landing Page",
  },
  {
    id: 3,
    name: "Tailwind",
  },
  {
    id: 4,
    name: "Bootstrap",
  },
];

const allData = [
  {
    id: 0,
    name: "Natours",
    category: ["Landing Page"],
    image: "/images/portfolio/natours.png",
    slug: "Natours",
  },
  {
    id: 1,
    name: "Nexter",
    category: ["Landing Page", "Flex Box"],
    image: "images/portfolio/nexter.png",
    slug: "nexter",
  },
  {
    id: 2,
    name: "Comfy Sloth",
    category: ["React", "Redux", "eCommerce"],
    image: "images/portfolio/comfysloth.png",
    slug: "comfy-sloth",
  },
  {
    id: 3,
    name: "Xypo",
    category: ["React", "Landing Page"],
    image: "images/portfolio/xypo.png",
    slug: "xypo",
  },
  {
    id: 4,
    name: "Brand",
    category: ["React", "Tailwind", "Landing Page"],
    image: "images/portfolio/tailwind1.png",
    slug: "tailwind1",
  },
  {
    id: 5,
    name: "React Landing",
    category: ["React", "Tailwind", "Landing Page"],
    image: "images/portfolio/tailwind2.png",
    slug: "tailwind2",
  },
  {
    id: 6,
    name: "Small Business Website",
    category: ["Bootstrap", "HTML", "CSS"],
    image: "images/portfolio/bootstrap1.png",
    slug: "small-business-website",
  },
  {
    id: 7,
    name: "Knowledge Base",
    category: ["Bootstrap", "HTML", "CSS"],
    image: "images/portfolio/knowledgebase.png",
    slug: "knowledge-base",
  },
  {
    id: 8,
    name: "PortFolio",
    category: ["Bootstrap", "HTML", "CSS"],
    image: "images/portfolio/bportfolio.png",
    slug: "bootstrap-portfolio",
  },
  {
    id: 9,
    name: "Resume and CV",
    category: ["Bootstrap", "HTML", "CSS"],
    image: "images/portfolio/bresume.png",
    slug: "resume-cv",
  },
];

function Portfolios2() {
  const [getAllItems] = useState(allData);
  const [dataVisibleCount, setDataVisibleCount] = useState(5);
  const [dataIncrement] = useState(3);
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [visibleItems, setVisibleItems] = useState([]);
  const [noMorePost, setNoMorePost] = useState(false);

  useEffect(() => {
    setActiveFilter(filters[0].name);
    setVisibleItems(getAllItems.filter((item) => item.id < 6));
  }, [getAllItems]);

  const handleChange = (e, index) => {
    // console.log(e.target.value);
    e.preventDefault();
    // let targetFilter = e.target.value
    //   ? e.target.value.toLowerCase()
    //   : e.target.textContent.toLowerCase();
    const targetFilter = filters[index].name;
    setActiveFilter(targetFilter);
    // console.log(activeFilter);
    let tempData;
    if (targetFilter === "All Projects") {
      tempData = getAllItems.filter((data) => data.id <= dataVisibleCount);
    } else {
      let temp = 0;
      tempData = getAllItems.filter((data) => {
        if (data.category.includes(targetFilter)) {
          temp++;
          console.log(temp);
        }
        return data.category.includes(targetFilter) && temp <= dataVisibleCount;
      });
    }
    setVisibleItems(tempData);
  };

  const handleLoadmore = (e) => {
    e.preventDefault();
    let tempCount = dataVisibleCount + dataIncrement;

    if (tempCount > getAllItems.length + 1) {
      setNoMorePost(true);
    } else {
      setDataVisibleCount(tempCount);
      if (activeFilter === "All Projects") {
        const items = getAllItems.filter((data) => data.id <= tempCount);
        if (tempCount > items.length + 1) {
          setNoMorePost(true);
        }
        setVisibleItems(items);
      } else {
        let temp = 0;
        let items = getAllItems.filter((data) => {
          if (data.category.includes(activeFilter)) {
            temp++;
          }
          return data.category.includes(activeFilter) && temp <= tempCount;
        });
        setVisibleItems(items);
      }
    }
  };

  return (
    <>
      <ul className="portfolio-filter list-inline">
        {filters.map((filter, index) => (
          <li
            className={
              filter.name === activeFilter
                ? "list-inline-item current"
                : "list-inline-item"
            }
            key={filter.id}
            onClick={(e) => handleChange(e, index)}
          >
            {filter.name}
          </li>
        ))}
      </ul>

      <div className="pf-filter-wrapper mb-4">
        <select
          className="portfolio-filter-mobile"
          onChange={(e) => handleChange(e)}
        >
          {filters.map((filter) => (
            <option value={filter.name} key={filter.id}>
              {filter.name}
            </option>
          ))}
        </select>
      </div>

      <div className="row portfolio-wrapper">
        {visibleItems.map((item) => (
          <div className="col-md-4 col-sm-6 grid-item" key={item.id}>
            <Portfolio2 portfolio={item} />
          </div>
        ))}
      </div>

      {noMorePost ? null : (
        <div className="load-more text-center mt-4">
          <a
            href="#!"
            className="btn btn-default"
            onClick={(e) => handleLoadmore(e)}
          >
            <i className="fas fa-circle-notch"></i> Load more
          </a>
        </div>
      )}
    </>
  );
}

export default Portfolios2;
