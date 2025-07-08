interface Dashboard {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const dashboardsData: Dashboard[] = [
  {
    title: 'Cambodia Tourism Intelligence',
    description: `Explore Cambodia's tourism data with interactive visualizations and insights.`,
    imgSrc: '/static/images/dashboard_cambodia_tourism_intelligance.jpeg',
    href: '/dashboards/cambodia-tourism-intelligence',
  },
]

export default dashboardsData
