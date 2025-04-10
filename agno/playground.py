from agno.tools.hackernews import HackerNewsTools
from agno.tools.googlesearch import GoogleSearchTools
from agno.tools.arxiv import ArxivTools
from agno.team.team import Team
from textwrap import dedent
import asyncio
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.playground import Playground, serve_playground_app
from agno.storage.agent.sqlite import SqliteAgentStorage


agent_storage: str = "tmp/agents.db"

web_agent = Agent(
    name="Web Agent",
    model=OpenAIChat(id="gpt-4o"),
    tools=[DuckDuckGoTools()],
    instructions=["Always include sources"],
    # Store the agent sessions in a sqlite database
    storage=SqliteAgentStorage(table_name="web_agent", db_file=agent_storage),
    # Adds the current date and time to the instructions
    add_datetime_to_instructions=True,
    # Adds the history of the conversation to the messages
    add_history_to_messages=True,
    # Number of history responses to add to the messages
    num_history_responses=5,
    # Adds markdown formatting to the messages
    markdown=True,
)


hackernews_researcher = Agent(
    name="HackerNews Researcher",
    model=OpenAIChat("gpt-4o"),
    role="Research a topic on HackerNews.",
    tools=[HackerNewsTools()],
    add_name_to_instructions=True,
    instructions=dedent("""
    You are a HackerNews researcher.
    You will be given a topic to research on HackerNews.
    You will need to find the most relevant posts on HackerNews.
    """),
)

academic_paper_researcher = Agent(
    name="Academic Paper Researcher",
    model=OpenAIChat("gpt-4o"),
    role="Research academic papers and scholarly content",
    tools=[GoogleSearchTools(), ArxivTools()],
    add_name_to_instructions=True,
    instructions=dedent("""
    You are a academic paper researcher.
    You will be given a topic to research in academic literature.
    You will need to find relevant scholarly articles, papers, and academic discussions.
    Focus on peer-reviewed content and citations from reputable sources.
    Provide brief summaries of key findings and methodologies.
    """),
)

twitter_researcher = Agent(
    name="Twitter Researcher",
    model=OpenAIChat("gpt-4o"),
    role="Research trending discussions and real-time updates",
    tools=[DuckDuckGoTools()],
    add_name_to_instructions=True,
    instructions=dedent("""
    You are a Twitter/X researcher.
    You will be given a topic to research on Twitter/X.
    You will need to find trending discussions, influential voices, and real-time updates.
    Focus on verified accounts and credible sources when possible.
    Track relevant hashtags and ongoing conversations.
    """),
)


agent_team = Team(
    name="Discussion Team",
    mode="collaborate",
    model=OpenAIChat("gpt-4o"),
    members=[
        web_agent,
        hackernews_researcher,
        academic_paper_researcher,
        twitter_researcher,
    ],
    instructions=[
        "You are a discussion master.",
        "You have to stop the discussion when you think the team has reached a consensus.",
    ],
    success_criteria="The team has reached a consensus.",
    update_team_context=True,
    send_team_context_to_members=True,
    show_tool_calls=True,
    markdown=True,
    show_members_responses=True,
)

if __name__ == "__main__":
    asyncio.run(
        agent_team.print_response(
            message="Start the discussion on the topic: 'What is the best way to learn to code?'",
            stream=True,
            stream_intermediate_steps=True,
        )
    )
